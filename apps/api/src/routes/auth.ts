import { Elysia, t } from "elysia";
import { BadRes, GoodRes } from "../types/response-type";
import {
    githubOauthCallback,
    googleOauthCallback,
    signin,
    signup,
    tempTokenExchange,
    validateMagicLink
} from "../lib/auth";
import { generateJWT } from "../lib/jwt";
import { getUserByEmail, getUserById } from "../lib/user";
import { generateOAuthState } from "../lib/crypto";
import config from "../config";

const auth = new Elysia({ prefix: "/auth" });

// routes
// POST /auth/signin
const signinSchema = {
    body: t.Object(
        {
            email: t.String({
                format: "email",
                maxLength: 255,
                minLength: 1,
                readOnly: true,
                description: "User email",
                error: "Invalid email"
            }),
            continue: t.String({
                maxLength: 255,
                minLength: 1,
                readOnly: true,
                default: "/dashboard",
                description: "Continue URL",
                error: "Invalid continue URL"
            })
        },
        {
            error: "Invalid request body"
        }
    )
};

auth.post(
    "/signin",
    async ({ body, set }) => {
        const user = await signin(body.email, body.continue);

        if (!user) {
            set.status = 401;
            const response: BadRes = {
                message: "Invalid email",
                code: 401
            };
            return response;
        }

        const response: GoodRes = {
            message: "magic link sent"
        };

        return response;
    },
    signinSchema
);

// POST /auth/signup
const signupSchema = {
    body: t.Object(
        {
            email: t.String({
                format: "email",
                maxLength: 255,
                minLength: 1,
                readOnly: true,
                description: "User email",
                error: "Invalid email"
            }),
            continue: t.String({
                maxLength: 255,
                minLength: 1,
                readOnly: true,
                default: "/onboarding/username",
                description: "Continue URL",
                error: "Invalid continue URL"
            })
        },
        {
            error: "Invalid request body"
        }
    )
};

auth.post(
    "/signup",
    async ({ body, set }) => {
        const user = await signup(body.email, body.continue);

        if (!user) {
            set.status = 401;
            const response: BadRes = {
                message: "Invalid email",
                code: 401
            };
            return response;
        }

        const response: GoodRes = {
            message: "magic link sent"
        };

        return response;
    },
    signupSchema
);

// POST /auth/magiclink/validate
const magiclinkSchema = {
    body: t.Object(
        {
            email: t.String({
                format: "email",
                maxLength: 255,
                minLength: 1,
                readOnly: true,
                description: "User email",
                error: "Invalid email"
            }),
            token: t.String({
                maxLength: 255,
                minLength: 1,
                readOnly: true,
                description: "Magic link token",
                error: "Invalid token"
            })
        },
        {
            error: "Invalid request body"
        }
    )
};

auth.post(
    "/magiclink/validate",
    async ({ body, set }) => {
        const valid = await validateMagicLink(body.email, body.token);

        if (!valid) {
            set.status = 401;
            const response: BadRes = {
                message: "Invalid email or token",
                code: 401
            };
            return response;
        }

        const user = await getUserByEmail(body.email);
        if (!user) {
            set.status = 500;
            const response: BadRes = {
                message: "Internal server error",
                code: 500
            };
            return response;
        }

        // send magic link
        const response: GoodRes = {
            message: "success",
            data: {
                user,
                token: generateJWT({ user_id: user.user_id, email: user.email })
            }
        };

        return response;
    },
    magiclinkSchema
);

// POST /auth/temptoken/exchange
const tempTokenSchema = {
    body: t.Object(
        {
            token: t.String({
                maxLength: 255,
                minLength: 1,
                readOnly: true,
                description: "Temporary token",
                error: "Invalid token"
            })
        },
        {
            error: "Invalid request body"
        }
    )
};

auth.post(
    "/temptoken/exchange",
    async ({ body, set }) => {
        const userId = await tempTokenExchange(body.token);

        if (!userId) {
            set.status = 401;
            const response: BadRes = {
                message: "Invalid or expired token",
                code: 401
            };
            return response;
        }

        const user = await getUserById(userId);
        if (!user) {
            set.status = 500;
            const response: BadRes = {
                message: "Internal server error",
                code: 500
            };
            return response;
        }

        const response: GoodRes = {
            message: "success",
            data: {
                user,
                token: generateJWT({ user_id: user.user_id, email: user.email })
            }
        };

        return response;
    },
    tempTokenSchema
);

// oauth
// GET /auth/oauth/:provider (returns a URL to redirect to)
auth.get("/oauth/:provider", async ({ params, set, query }) => {
    const continueTo = query.continue;
    const state = await generateOAuthState(params.provider);

    if (!state) {
        set.status = 500;
        const response: BadRes = {
            message: "Internal server error",
            code: 500
        };
        return response;
    }

    let url = "";

    if (params.provider === "github") {
        // construct the URL for auth
        const scopes = "read:user,user:email";
        url = `https://github.com/login/oauth/authorize?client_id=${config.oauth.github.clientId}&redirect_uri=${config.oauth.github.redirectUri}&state=${state}&scope=${scopes}&continue=${continueTo}`;
    } else if (params.provider === "google") {
        // construct the URL for auth
        const scopes =
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
        url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.oauth.google.clientId}&redirect_uri=${config.oauth.google.redirectUri}&response_type=code&scope=${scopes}&state=${state}`;
    }

    const response: GoodRes = {
        message: "success",
        data: {
            url
        }
    };

    return response;
});

// GET /auth/oauth/:provider/callback
auth.get("/oauth/:provider/callback", async ({ query, set, params, request }) => {
    const provider = params.provider;

    const code = query.code;
    const state = query.state;
    const continueTo = query.continue;

    // make sure we have the code/token and state
    if (!code || !state) {
        set.status = 401;
        set.redirect = `${config.frontend.url}/auth/oauth/error?error=${encodeURIComponent("Invalid code or state")}`;
        return;
    }

    // exchange the code for a temporary token based on the provider
    let tempToken;

    if (provider === "github") {
        tempToken = await githubOauthCallback(code as string, state);
    } else if (provider === "google") {
        tempToken = await googleOauthCallback(code as string, state);
    } else {
        set.status = 401;
        set.redirect = `${config.frontend.url}/auth/oauth/error?error=${encodeURIComponent("Invalid provider")}`;
        return;
    }

    if (tempToken?.error) {
        // redirect to the frontend with the error
        set.status = 401;
        set.redirect = `${config.frontend.url}/auth/oauth/error?error=${encodeURIComponent(tempToken.message)}`;
        return;
    }

    if (tempToken?.message === "created new user") {
        // redirect to the frontend with the token
        set.status = 200;
        set.redirect = `${config.frontend.url}/auth/oauth/success?token=${encodeURIComponent(
            tempToken.data.token
        )}&continue=${encodeURIComponent("/onboarding/username")}`;
        return;
    }

    // TODO: make this redirect to the frontend with the token
    set.status = 200;
    set.redirect = `${config.frontend.url}/auth/oauth/success?token=${encodeURIComponent(tempToken?.data.token)}${
        continueTo ? "&continue=" + encodeURIComponent(continueTo as string) : ""
    }`;

    return;
});

export default auth;
