import { query } from "./db.js";

export async function insertUser(name, email, password) {
  const queryText = `
        INSERT INTO users(name, email, password_hash)
        VALUES($1, $2, $3)
        RETURNING id, name, email
    `;

  try {
    const res = await query(queryText, [name, email, password]);

    return res.rows[0];
  } catch (err) {
    if (err.code === "23505") {
      err.status = 409;
      err.message = "Email already exists";
    }
    throw err;
  }
}

export async function getUserByEmail(email) {
  const queryText = `
        SELECT id, name, email, password_hash FROM users
        WHERE email = $1
    `;

  try {
    const res = await query(queryText, [email]);

    if (res.rows.length === 0) {
      const err = new Error("Cannot find user");
      err.status = 404;
      throw err;
    }

    return res.rows[0];
  } catch (err) {
    throw err;
  }
}
