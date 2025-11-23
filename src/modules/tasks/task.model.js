import { pool } from "../../config/db.js";

export const TaskModel = {
  getByProject: async (projectId) => {
    const query = `
      SELECT t.*, u.name AS assignee_name
      FROM tasks t
      LEFT JOIN users u ON t.assignee_id = u.id
      WHERE project_id = $1
      ORDER BY position ASC
    `;
    const { rows } = await pool.query(query, [projectId]);
    return rows;
  },

  getById: async (id) => {
    const query = `
      SELECT t.*, u.name AS assignee_name
      FROM tasks t
      LEFT JOIN users u ON t.assignee_id = u.id
      WHERE t.id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  create: async ({
    project_id,
    title,
    description,
    status,
    priority,
    assignee_id,
    position,
  }) => {
    const query = `
      INSERT INTO tasks (project_id, title, description, status, priority, assignee_id, position)
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`;

    const { rows } = await pool.query(query, [
      project_id,
      title,
      description,
      status,
      priority,
      assignee_id,
      position || 0,
    ]);

    return rows[0];
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    Object.entries(data).forEach(([key, value], index) => {
      if (value !== undefined) {
        fields.push(`${key} = $${index + 1}`);
        values.push(value);
      }
    });

    if (fields.length === 0) {
      throw new AppError("No valid fields to update", 400);
    }

    const query = `
      UPDATE tasks 
      SET ${fields.join(", ")}
      WHERE id = $${values.length + 1}
      RETURNING *;
  `;

    values.push(id);

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  updatePosition: async (id, position, status) => {
    const query = `
      UPDATE tasks
      SET position=$1, status=$2
      WHERE id=$3 RETURNING *`;
    const { rows } = await pool.query(query, [position, status, id]);
    return rows[0];
  },

  delete: async (id) => {
    const query = `DELETE FROM tasks WHERE id=$1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },
};
