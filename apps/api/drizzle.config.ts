import { defineConfig } from "drizzle-kit";
import config from "./src/config";
export default defineConfig({
    schema: "./src/db/schema/*.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: config.db.url
    },
    verbose: true,
    strict: true
});
