import type { Config } from 'drizzle-kit';

export default {
  schema: './src/features/database/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: process.env.PG_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_USER,
    database: process.env.PG_DATABASE,
  },
} satisfies Config;