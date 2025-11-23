import pool  from "../../config/db.js"

export const ProjectModel = {

  getAll: async () => {
    const query = "SELECT * FROM projects ORDER BY id DESC";
    const { rows } = await pool.query(query);
    return rows;
  },


  getAllByMember: async (userId) => {
    const query = `
      SELECT DISTINCT p.* 
      FROM projects p
      JOIN tasks t ON t.project_id = p.id
      WHERE t.assignee_id = $1
      ORDER BY p.id DESC
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  },



  getById: async (id) => {
    const query = "SELECT * FROM projects WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },


  create: async ({ name, description, status, created_by }) => {
    const query = `
      INSERT INTO projects (name, description, status, created_by)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const { rows } = await pool.query(query, [name, description, status, created_by]);
    return rows[0];
  },



  update: async (id, { name, description, status }) => {
    const query = `
      UPDATE projects
      SET name = $1, description = $2, status = $3
      WHERE id = $4 RETURNING *`;
    const { rows } = await pool.query(query, [name, description, status, id]);
    return rows[0];
  },


  delete: async (id) => {
    const query = "DELETE FROM projects WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },
};

