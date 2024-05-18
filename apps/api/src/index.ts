import { Elysia, t } from "elysia";
import { logger } from "@grotto/logysia";
// import { swagger } from "@elysiajs/swagger";
import config from "./config";
import { cors } from "@elysiajs/cors";
import { bearer } from "@elysiajs/bearer";

// import routes
import auth from "./routes/auth";
import user from "./routes/user";
import news from "./routes/news";
import stripe from "./routes/stripe";

// import types
import type { GoodRes } from "./types/response-type";

// create app
const app = new Elysia();

// middleware
app.use(logger({ logIP: true }));
app.use(cors());
app.use(bearer());
// app.use(swagger({ documentation: { info: { title: "tip.dev API", version: "1.0.0" } } }));

// routes
app.get("/", () => <GoodRes>{ message: "hey there" });
app.use(auth); // /auth/*
app.use(user); // /user/*
app.use(news); // /news/*
app.use(stripe); // /stripe/*

// listen
app.listen(config.port, () => {
    console.log(`🟢 Live on port ${config.port}`);
});
