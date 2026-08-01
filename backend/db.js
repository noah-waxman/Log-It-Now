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
