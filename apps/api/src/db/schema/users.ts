import { bigint, boolean, json, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    user_id: varchar("user_id", { length: 255 }).primaryKey().notNull(),
    username: varchar("username", { length: 255 }).unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    created_at: bigint("created_at", { mode: "number" }).notNull(),
    updated_at: bigint("updated_at", { mode: "number" }).notNull(),
    last_login: bigint("last_login", { mode: "number" }).notNull(),
    name: varchar("name", { length: 255 }),
    website: varchar("website", { length: 255 }),
    bio: varchar("bio", { length: 255 }),
    page: jsonb("page").notNull(),
    pictures: jsonb("pictures").notNull().default({
        avatar: "",
        banner: ""
    }),
    socials: jsonb("socials"),
    stripe: jsonb("stripe"),
    oauth_github: varchar("oauth_github", { length: 255 }).unique(),
    oauth_google: varchar("oauth_google", { length: 255 }).unique()
});
