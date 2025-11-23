import pool  from "../../config/db.js"

export const TaskModel = {
    
  getByProject: async (projectId) => {
    const query = `
      SELECT t.*, u.name AS assignee_name
      FROM tasks t
      LEFT JOIN users u ON t.assignee_id = u.id
      WHERE project_id = $1
      ORDER BY position ASC`;
    const { rows } = await pool.query(query, [projectId]);
    return rows;
  },

  create: async ({ project_id, title, description, status, priority, assignee_id }) => {
    const query = `
      INSERT INTO tasks (project_id, title, description, status, priority, assignee_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;
    const { rows } = await pool.query(query, [
      project_id,
      title,
      description,
      status,
      priority,
      assignee_id,
    ]);
    return rows[0];
  },
};
