import { neon } from "@neondatabase/serverless";
import { asyncTCWrapper } from "../utils/tryCatchWrapper.js";

const reset = '\x1b[0m';
const green = '\x1b[32m';
const bold = '\x1b[1m';
const sql = neon(`${process.env.NEON_DATABASE_URI}`);

// Test connection function
const connectNeonDb = asyncTCWrapper(async () => {
  const result = await sql`SELECT 1`;
  console.log(`${green}${bold}✅ Connected to Neon DB successfully:${reset}`, result);
  console.log(); // Add space
  return result; // Optional: return for potential use
});

export { sql, connectNeonDb };