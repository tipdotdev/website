import { relations } from "drizzle-orm";
import { bigint, integer, jsonb, pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const incomeEvents = pgTable("income_events", {
    event_id: varchar("id", { length: 255 }).primaryKey().notNull(),
    to_user_id: varchar("to_user_id", { length: 255 }).notNull(),
    // the from_user is an object with the user_id and username
    // this object will be { user_id: string (can be null), username: string (either the username or the entered name) }
    from_user: jsonb("from_user").notNull(),
    amount: bigint("amount", { mode: "number" }).notNull(),
    created_at: bigint("created_at", { mode: "number" }).notNull(),
    updated_at: bigint("updated_at", { mode: "number" }).notNull(),
    // the metadata is an object with some extra information about the event
    // this object can be { message?: string, source: string, ... }
    meta: jsonb("metadata").notNull(),
    event_type: integer("event_type").notNull() // 0 = tip, ...
});

export const incomeUsersRelation = relations(incomeEvents, ({ one }) => ({
    toUser: one(users, {
        fields: [incomeEvents.to_user_id],
        references: [users.user_id]
    })
}));
