
import { TaskModel } from "./task.model.js";
import AppError from "../../utils/app.error.js";
import { pool } from "../../config/db.js";

export const TaskService = {

getTasksByProject: async (projectId, user, filters) => {
  const { search, status, priority, assignee } = filters;

  let query = `
    SELECT * FROM tasks
    WHERE project_id = $1
  `;

  const values = [projectId];
  let count = 2; // parameter index ($2, $3, ...)

  // ROLE CHECK
  if (user.role.toUpperCase() !== "ADMIN") {
    query += ` AND assignee_id = $${count}`;
    values.push(user.id);
    count++;
  }

  // SEARCH FILTER
  if (search) {
    query += ` AND title ILIKE $${count}`;
    values.push(`%${search}%`);
    count++;
  }

  // STATUS FILTER
  if (status) {
    query += ` AND status = $${count}`;
    values.push(status);
    count++;
  }

  // PRIORITY FILTER
  if (priority) {
    query += ` AND priority = $${count}`;
    values.push(priority);
    count++;
  }

  // ASSIGNEE FILTER (only admin can use this)
  if (assignee && user.role.toUpperCase() === "ADMIN") {
    query += ` AND assignee_id = $${count}`;
    values.push(assignee);
    count++;
  }

  query += ` ORDER BY position ASC`;

  const result = await pool.query(query, values);

  return result.rows;
},

  getTaskById: async (id, user) => {

    const task = await TaskModel.getById(id)
    if (!task) throw new AppError("Task not found", 404)

    if (user.role === "MEMBER" && task.assignee_id !== user.id) {
      throw new AppError("Access denied", 403)
    }
    return task
  },


createTask: async (data) => {
  if (data.project_id == null) {
    throw new AppError("Project ID is required", 400);
  }

  if (data.assignee_id == null) {
    throw new AppError("Task must be assigned to a member", 400);
  }

  return await TaskModel.create(data);
},

updateTask: async (id, data, user) => {
  const task = await TaskModel.getById(id);
  if (!task) throw new AppError("Task not found", 404);

  if (user.role === "MEMBER") {
    const statusOrder = ["TODO", "IN_PROGRESS", "DONE"];

    if (statusOrder.indexOf(data.status) < statusOrder.indexOf(task.status)) {
      throw new AppError("Cannot move task backward", 400);
    }

   
    data = { status: data.status };
  }

  return await TaskModel.update(id, data);
},



  updatePosition: async (id, position, status, user) => {

    const task = await TaskModel.getById(id)
    if (!task) throw new AppError("Task not found", 404)


    const statusOrder = ["TODO", "IN_PROGRESS", "DONE"]

    if (user.role === "MEMBER" && statusOrder.indexOf(status) < statusOrder.indexOf(task.status)) {
      throw new AppError("Cannot move task backward",400)
    }

    return await TaskModel.updatePosition(id, position, status)
  },

  deleteTask: async (id) => {
    return await TaskModel.delete(id)
  },


};
