import { eq, is } from "drizzle-orm";
import { users } from "../db/schema/users";
import db from "../db/db";
import { UserType } from "../types/user-type";
import redis from "../db/redis";
import { unixNow } from "./time";
import { validateUsernameFormat } from "./validate";

// Get user by username
async function getUserByUsername(username: string) {}

// get user by email
async function getUserByEmail(email: string): Promise<UserType | null> {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1).execute();
    if (user.length > 0) {
        return user[0];
    } else {
        return null;
    }
}

// get user by id
async function getUserById(user_id: string): Promise<UserType | null> {
    const user = await db.select().from(users).where(eq(users.user_id, user_id)).limit(1).execute();
    if (user.length > 0) {
        return user[0];
    } else {
        return null;
    }
}

// update a users username
async function updateUsername(user_id: string, username: string, user: UserType): Promise<UserType | null> {
    if (!validateUsernameFormat) {
        return null;
    }

    if (user.username === username) {
        return user;
    }

    // check if the username is available (full db check, not just the set in redis)
    const takenName = await db.select().from(users).where(eq(users.username, username)).execute();
    if (takenName.length > 0) {
        return null;
    }
    // update the username
    const now = unixNow();

    const update = await db
        .update(users)
        .set({ username, updated_at: now })
        .where(eq(users.user_id, user_id))
        .execute(); // update the user in the db

    if (user.username) {
        // if the user had a username before (not the first time they're setting it)
        await redis.srem("td:usernames", user.username); // remove the old username from the set
    }
    await redis.sadd("td:usernames", username); // add the new username to the set

    // if the update was successful, return the updated user
    if (update) {
        const updatedUser = await db.select().from(users).where(eq(users.user_id, user_id)).limit(1).execute();
        if (updatedUser.length > 0) {
            return updatedUser[0];
        }
    }
    return null;
}

// update user
async function updateUser(user_id: string, data: any): Promise<UserType | null> {
    if (
        data.username ||
        data.email ||
        data.stripe ||
        data.created_at ||
        data.updated_at ||
        data.user_id ||
        data.password ||
        data.oauth ||
        data.last_login ||
        data.pictures
    ) {
        return null;
    }

    const now = unixNow();
    data.updated_at = now;
    const update = await db.update(users).set(data).where(eq(users.user_id, user_id)).execute();
    if (update) {
        const user = await db.select().from(users).where(eq(users.user_id, user_id)).limit(1).execute();
        if (user.length > 0) {
            return user[0];
        }
    }
    return null;
}

// quick check username availability
async function quickCheckUsername(username: string): Promise<boolean> {
    // returns true if the username is available, false if it's not
    if (!validateUsernameFormat(username)) {
        return false;
    }
    const isMember = await redis.sismember("td:usernames", username);
    return isMember === 0 ? true : false;
}

// get github user
async function getGithubUser(token: string): Promise<any> {
    const response = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data: any = await response.json();
    if (data.message) {
        return null;
    }

    const response2 = await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const emails: any = await response2.json();
    if (emails.message) {
        return null;
    }

    data.emails = emails;

    return data;
}

async function getGoogleUser(token: string): Promise<any | null> {
    // make a request to google to get the user info
    const req = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    // make sure the req worked
    if (!req.ok) {
        return null;
    }

    // parse the response
    const res = await req.json();

    // return the user
    return res;
}

// get user by github id
async function getUserByGithubId(id: string): Promise<UserType | null> {
    const user = await db.select().from(users).where(eq(users.oauth_github, id)).limit(1).execute();
    if (user.length > 0) {
        return user[0];
    } else {
        return null;
    }
}

// get user by google id
async function getUserByGoogleId(id: string): Promise<UserType | null> {
    const user = await db.select().from(users).where(eq(users.oauth_google, id)).limit(1).execute();
    if (user.length > 0) {
        return user[0];
    } else {
        return null;
    }
}

export {
    getUserByUsername,
    getUserByEmail,
    getUserById,
    updateUsername,
    quickCheckUsername,
    updateUser,
    getGithubUser,
    getGoogleUser,
    getUserByGithubId,
    getUserByGoogleId
};
