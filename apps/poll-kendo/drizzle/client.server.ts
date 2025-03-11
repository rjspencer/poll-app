import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

console.log(process.env.DATABASE_URL, { ...process.env });

export const db = (database: D1Database) => drizzle(database, { schema });
