import { Elysia, t } from "elysia";
import { BadRes, GoodRes } from "../types/response-type";
import { enter, isMember } from "../lib/news";

const news = new Elysia({ prefix: "/news" });

// POST /news/enter
const enterSchema = {
    body: t.Object(
        {
            email: t.String({
                format: "email",
                maxLength: 255,
                description: "Email address of the user",
                default: "",
                error: "Invalid email"
            })
        },
        {
            error: "Invalid request body"
        }
    )
};

news.post(
    "/enter",
    async ({ body, set }) => {
        if (await isMember(body.email)) {
            set.status = 400;
            const res: BadRes = { message: "Already subscribed", code: 400 };
            return res;
        }

        if (await enter(body.email)) {
            const res: GoodRes = { message: "success" };
            return res;
        } else {
            set.status = 500;
            const res: BadRes = { message: "Failed to subscribe", code: 500 };
            return res;
        }
    },
    enterSchema
);

export default news;
