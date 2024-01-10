import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

type Database = PostgresJsDatabase<Record<string, any>>;

export { Database }