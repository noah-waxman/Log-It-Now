import { Pool } from "pg";
export const pool = new Pool({
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export function query(text, params) {
  return pool.query(text, params);
}

export async function truncateTable(table) {
  try {
    const res = await query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);

    if (res.command === "TRUNCATE") {
      console.log(`${table} cleared successfully`);
    }
  } catch (err) {
    console.error(`Error while truncating ${table}:`, err);
    throw err;
  }
}
