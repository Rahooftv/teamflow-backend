import pool  from "../../config/db.js"


export const UserModel = {
  findByEmail: async (email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },

  findById: async (id) => {
    const query = "SELECT id, name, email, role FROM users WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  create: async ({ name, email, password, role }) => {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at`;
    const { rows } = await pool.query(query, [name, email, password, role]);
    return rows[0];
  },

   getAllMembers: async () => {
    const query = "SELECT id, name, email, role FROM users WHERE role = 'MEMBER' ORDER BY name ASC";
    const { rows } = await pool.query(query);
    return rows;
  },

};

