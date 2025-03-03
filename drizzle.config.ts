import { defineConfig } from "drizzle-kit";
import * as process from "node:process";

export default defineConfig({
  dialect: "postgresql",
  schema: "server/db/schemas/*",
  out: "drizzle",
  dbCredentials: {
    url: process.env["DATABASE_URL"]!,
  },
});
