import { pool } from "../src/config/db.js"

export const UserModel = {
  findByEmail: async (email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },

  create: async ({ name, email, hashedPassword, role }) => {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const { rows } = await pool.query(query, [
      name,
      email,
      hashedPassword,
      role,
    ]);
    return rows[0];
  },
};
