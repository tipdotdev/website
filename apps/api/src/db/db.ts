import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../config";

// import schemas
import * as userSchema from "./schema/users";
import * as incomeEventsSchema from "./schema/income_events";

// for query purposes
const queryClient = postgres(config.db.url);
const db = drizzle(queryClient, {
    schema: {
        ...userSchema,
        ...incomeEventsSchema
    }
});

export default db;
