import pool  from "../../config/db.js"

export const ProjectModel = {
  getAll: async () => {
    const query = "SELECT * FROM projects ORDER BY id DESC";
    const { rows } = await pool.query(query);
    return rows;
  },

  create: async ({ name, description, status, created_by }) => {
    const query = `
      INSERT INTO projects (name, description, status, created_by)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const { rows } = await pool.query(query, [
      name,
      description,
      status,
      created_by,
    ]);
    return rows[0];
  },
};
