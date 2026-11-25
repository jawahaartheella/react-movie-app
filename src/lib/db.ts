import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("Cannot find database connection string");
}

// In Next.js development, we reuse the connection to prevent connection leaks during fast-refresh
// The Problem: Fast-Refresh in Next.js
// When you run npm run dev, Next.js uses a feature called Fast Refresh (Hot Module Replacement):
// Every time you edit a file and press Ctrl + S, Next.js clears the file from cache and re-runs the code so you see your changes instantly.

const globalForDB = global as unknown as { sql?: postgres.Sql };
export const sql = globalForDB.sql || postgres(connectionString);

// In production (when deployed to Vercel/production server), Fast Refresh does not exist, so this is skipped.
if (process.env.NODE_ENV !== "production") globalForDB.sql = sql;
