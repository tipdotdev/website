import { Elysia, t } from "elysia";
import { BadRes, GoodRes } from "../types/response-type";
import { verifyJWT } from "../lib/jwt";
import {
    getUserById,
    getUserByUsername,
    quickCheckUsername,
    updateUser,
    updateUsername
} from "../lib/user";

const user = new Elysia({ prefix: "/user" });

// GET /user/me
user.get(
    "/me",
    async ({ bearer, set }) => {
        const jwtData: any = verifyJWT(bearer);
        // get the user with income events
        const user = await getUserById(jwtData.user_id, true);
        if (!user) {
            set.status = 401;
            const response: BadRes = {
                message: "User not found",
                code: 404
            };
            return response;
        }

        const response: GoodRes = {
            message: "success",
            data: user
        };

        return response;
    },
    {
        beforeHandle({ bearer, set }) {
            if (!bearer) {
                set.status = 401;
                return "Unauthorized";
            } else {
                try {
                    const user = verifyJWT(bearer);
                    if (!user) {
                        set.status = 401;
                        return "Unauthorized";
                    }
                } catch (error: any) {
                    set.status = 401;
                    return "Unauthorized";
                }
            }
        }
    }
);

// GET /user/:username
user.get("/:username", async ({ params, set }) => {
    const username = params.username;
    const user = await getUserByUsername(username);

    if (!user) {
        set.status = 404;
        const response: BadRes = {
            message: "User not found",
            code: 404
        };
        return response;
    }

    const response: GoodRes = {
        message: "success",
        data: user
    };

    return response;
});

// POST /user/me/username
const updateUsernameSchema = t.Object({
    username: t.String({
        minLength: 3,
        maxLength: 20,
        contentEncoding: "utf-8",
        pattern: "[a-z][a-z0-9_.-]{2,19}", // this regex only allows lowercase letters, numbers, and special characters . _ -
        error: "Invalid username."
    })
});

user.post(
    "/me/username",
    async ({ body, bearer, set }) => {
        const jwtData: any = verifyJWT(bearer);

        const user = await getUserById(jwtData.user_id);
        if (!user) {
            set.status = 401;
            const response: BadRes = {
                message: "User not found",
                code: 404
            };
            return response;
        }

        const update = await updateUsername(jwtData.user_id, body.username, user);

        if (!update) {
            set.status = 400;
            const response: BadRes = {
                message: "Username already taken.",
                code: 400
            };
            return response;
        }

        const response: GoodRes = {
            message: "success",
            data: update
        };

        return response;
    },
    {
        body: updateUsernameSchema,
        beforeHandle({ bearer, set }) {
            if (!bearer) {
                set.status = 401;
                return "Unauthorized";
            } else {
                try {
                    const user = verifyJWT(bearer);
                    if (!user) {
                        set.status = 401;
                        return "Unauthorized";
                    }
                } catch (error: any) {
                    set.status = 401;
                    return "Unauthorized";
                }
            }
        }
    }
);

// GET /user/:username/available
// returns true if the username is available, false if it's not
user.get("/:username/available", async ({ params, set }) => {
    const username = params.username;

    const available = await quickCheckUsername(username);

    if (!available) {
        set.status = 400;
        const response: BadRes = {
            message: "Username unavailable.",
            code: 400
        };
        return response;
    }

    const response: GoodRes = {
        message: "Username available."
    };

    return response;
});

// POST /user/me/update
const updateUserSchema = t.Object({
    // the body has a data field that can contain any number of fields
    data: t.Object({}, { additionalProperties: true, error: "Missing data field" })
});

user.post(
    "/me/update",
    async ({ body, bearer, set }) => {
        const jwtData: any = verifyJWT(bearer);

        const update = await updateUser(jwtData.user_id, body.data);

        if (!update) {
            set.status = 400;
            const response: BadRes = {
                message: "Update failed.",
                code: 400
            };
            return response;
        }

        const response: GoodRes = {
            message: "success",
            data: update
        };

        return response;
    },
    {
        body: updateUserSchema,
        beforeHandle({ bearer, set }) {
            if (!bearer) {
                set.status = 401;
                return "Unauthorized";
            } else {
                try {
                    const user = verifyJWT(bearer);
                    if (!user) {
                        set.status = 401;
                        return "Unauthorized";
                    }
                } catch (error: any) {
                    set.status = 401;
                    return "Unauthorized";
                }
            }
        }
    }
);

export default user;
