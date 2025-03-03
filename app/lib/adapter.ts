import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as process from "node:process";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

const processEnv = EnvSchema.parse(process.env);

const queryClient = postgres(processEnv.DATABASE_URL);

export const db = drizzle(queryClient);
