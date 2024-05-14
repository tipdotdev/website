import { users } from "../db/schema/users";
import db from "../db/db";
import redis from "../db/redis";
import log from "./logger";
import {
    base64Decode,
    base64Encode,
    compareHash,
    decryptString,
    encryptString,
    generateUUID,
    hashString
} from "./crypto";
import { UserType } from "../types/user-type";
import { eq } from "drizzle-orm";
import { getGithubUser, getGoogleUser, getUserByEmail, getUserByGithubId, getUserByGoogleId } from "./user";
import { unixNow } from "./time";
import { emailMagicLink } from "./email";
import config from "../config";

// signin
async function signin(email: string, continueTo: string): Promise<UserType | null> {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return null;
        }

        const sendML = await generateMagicLink(email, continueTo);
        if (sendML) {
            return user;
        } else {
            return null;
        }
    } catch (error: any) {
        log.error("Signin error", error);
        return null;
    }
}

// signup
async function signup(email: string, continueTo: string): Promise<UserType | null> {
    try {
        // make sure email isnt already in use
        if ((await getUserByEmail(email)) !== null) {
            return null;
        }

        const now = unixNow();
        const user: UserType = {
            user_id: generateUUID("user"),
            email: email,
            created_at: now,
            updated_at: now,
            last_login: now,
            page: {},
            pictures: {
                avatar: "https://cdn.tip.dev/tipdev/avatars/default.webp",
                banner: ""
            }
        };

        // insert user
        try {
            await db.insert(users).values(user).execute();
            const sendML = await generateMagicLink(email, continueTo);
            if (sendML) {
                return user;
            } else {
                return null;
            }
        } catch (error: any) {
            log.error("Signup error", error);
            return null;
        }
    } catch (error: any) {
        log.error("Signup error", error);
        return null;
    }
}

// send magic link
async function generateMagicLink(email: string, continueTo: string): Promise<object | null> {
    const user = await getUserByEmail(email);
    if (!user) {
        return null;
    }

    const token = generateUUID("ml");
    await redis.setex(`ml_${user.user_id}`, 60 * 5, await hashString(token));
    const emailData = await emailMagicLink(email, token, continueTo);
    if (emailData) {
        return {
            sent: true
        };
    }
    return null;
}

async function validateMagicLink(email: string, token: string): Promise<boolean> {
    const user = await getUserByEmail(email);
    if (!user) {
        return false;
    }

    const hashed = await redis.get(`ml_${user.user_id}`);
    if (hashed) {
        if (await compareHash(token, hashed as string)) {
            await redis.del(`ml_${user.user_id}`);
            const now = unixNow();
            await db.update(users).set({ last_login: now }).where(eq(users.user_id, user.user_id)).execute();
            return true;
        }
    }
    return false;
}

// create a temp token
async function generateTempToken(userId: string): Promise<string | null> {
    const tempToken = generateUUID("temp_" + userId);
    await redis.setex(tempToken, 60, "valid");
    return tempToken;
}

// exchange temp token (returns a user_id if valid, null if not)
async function tempTokenExchange(token: string): Promise<string | null> {
    const decrypted = await decryptString(token);
    if (!decrypted) {
        return null;
    }

    const valid = await redis.get(decrypted);
    if (valid) {
        await redis.del(decrypted);

        const parts = decrypted.split("_");
        const userId = "user_" + parts[2];

        // update last login
        await db.update(users).set({ last_login: unixNow() }).where(eq(users.user_id, userId)).execute();

        return userId;
    }
    return null;
}

// OAuth
async function validateOauthState(state: string): Promise<boolean> {
    // the state will be base64 encoded
    const decoded = base64Decode(state);
    const valid = await redis.get(decoded);
    if (decoded && valid) {
        await redis.del(decoded);
        return true;
    }
    return false;
}

async function githubOauthCallback(
    token: string,
    state: string
): Promise<{ error: boolean; message: string; data: any }> {
    if (!(await validateOauthState(decodeURIComponent(state)))) {
        return {
            error: true,
            message: "Invalid state",
            data: null
        };
    }

    const ghToken = await githubTokenExchange(token);
    if (!ghToken) {
        return {
            error: true,
            message: "Error exchanging token",
            data: null
        };
    }

    const ghUser = await getGithubUser(ghToken.access_token);
    if (!ghUser) {
        return {
            error: true,
            message: "Error fetching github user",
            data: null
        };
    }

    const user = await getUserByGithubId(ghUser.id);
    if (!user) {
        // check if the email is already in use
        const emailUser = await getUserByEmail(ghUser.emails[0].email);
        if (emailUser) {
            return {
                error: true,
                message: "Email already in use, please sign in with your email",
                data: null
            };
        } else {
            // create a new user
            const now = unixNow();
            const newUser: UserType = {
                user_id: generateUUID("user"),
                email: ghUser.emails[0].email,
                created_at: now,
                updated_at: now,
                last_login: now,
                page: {},
                pictures: {
                    avatar: ghUser.avatar_url,
                    banner: ""
                },
                oauth_github: ghUser.id
            };

            try {
                await db.insert(users).values(newUser).execute();
                return {
                    error: false,
                    message: "created new user",
                    data: {
                        token: await encryptString((await generateTempToken(newUser.user_id)) || "")
                    }
                };
            } catch (error: any) {
                log.error("Error creating new user", error);
                return {
                    error: true,
                    message: "Internal server error",
                    data: null
                };
            }
        }
    }

    return {
        error: false,
        message: "success",
        data: {
            token: await encryptString((await generateTempToken(user.user_id)) || "")
        }
    };
}

async function googleOauthCallback(
    token: string,
    state: string
): Promise<{ error: boolean; message: string; data: any }> {
    if (!(await validateOauthState(decodeURIComponent(state)))) {
        return {
            error: true,
            message: "Invalid state",
            data: null
        };
    }

    const googleAccessToken = await googleTokenExchange(token);
    if (!googleAccessToken) {
        return {
            error: true,
            message: "Error exchanging token",
            data: null
        };
    }

    const googleUser = await getGoogleUser(googleAccessToken.access_token);
    if (!googleUser) {
        return {
            error: true,
            message: "Error fetching user info from google",
            data: null
        };
    }

    const user = await getUserByGoogleId(googleUser.id);
    if (!user) {
        // check if the email is already in use
        const emailUser = await getUserByEmail(googleUser.email);
        if (emailUser) {
            return {
                error: true,
                message: "Email already in use, please sign in with your email",
                data: null
            };
        } else {
            // create a new user
            const now = unixNow();
            const newUser: UserType = {
                user_id: generateUUID("user"),
                email: googleUser.email,
                created_at: now,
                updated_at: now,
                last_login: now,
                page: {},
                pictures: {
                    avatar: googleUser.picture,
                    banner: ""
                },
                oauth_google: googleUser.id
            };

            try {
                await db.insert(users).values(newUser).execute();
                return {
                    error: false,
                    message: "created new user",
                    data: {
                        token: await encryptString((await generateTempToken(newUser.user_id)) || "")
                    }
                };
            } catch (error: any) {
                log.error("Error creating new user", error);
                return {
                    error: true,
                    message: "Internal server error",
                    data: null
                };
            }
        }
    }

    return {
        error: false,
        message: "success",
        data: {
            token: await encryptString((await generateTempToken(user.user_id)) || "")
        }
    };
}

async function githubTokenExchange(code: string): Promise<any | null> {
    const response = await fetch(
        `https://github.com/login/oauth/access_token?client_id=${config.oauth.github.clientId}&client_secret=${config.oauth.github.clientSecret}&code=${code}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json"
            }
        }
    );

    if (!response.ok) {
        log.error({
            message: "Error fetching github token",
            response: response
        });
        return null;
    }

    try {
        const data = await response.json();
        return data as object;
    } catch (err) {
        log.error({
            message: "Error parsing response from github",
            error: err,
            response: response
        });
        return null;
    }
}

async function googleTokenExchange(code: string): Promise<any | null> {
    const response = await fetch(`https://oauth2.googleapis.com/token`, {
        method: "POST",
        headers: {
            Accept: "application/json"
        },
        body: JSON.stringify({
            code: code,
            client_id: config.oauth.google.clientId,
            client_secret: config.oauth.google.clientSecret,
            redirect_uri: config.oauth.google.redirectUri,
            grant_type: "authorization_code"
        })
    });

    if (!response.ok) {
        log.error({
            message: "Error fetching google token",
            response: response
        });
        return null;
    }

    try {
        const data = await response.json();
        return data as object;
    } catch (err) {
        log.error({
            message: "Error parsing response from google",
            error: err,
            response: response
        });
        return null;
    }
}

export {
    signin,
    signup,
    generateMagicLink,
    validateMagicLink,
    githubOauthCallback,
    tempTokenExchange,
    generateTempToken,
    validateOauthState,
    googleOauthCallback
};
