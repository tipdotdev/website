import { defineConfig } from "drizzle-kit";
import config from "./src/config";
export default defineConfig({
    schema: "./src/db/schema/*.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        // connectionString: config.db.url
        connectionString:
            "postgresql://postgresdb_owner:PHfZiVh2WLT4@ep-summer-brook-a58r8o45.us-east-2.aws.neon.tech/postgresdb?sslmode=require"
    },
    verbose: true,
    strict: true
});
