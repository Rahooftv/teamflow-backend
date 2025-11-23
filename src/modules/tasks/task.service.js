
import { TaskModel } from "./task.model.js";
import AppError from "../../utils/app.error.js";
import { pool } from "../../config/db.js";

export const TaskService = {

getTasksByProject: async (projectId, user) => {

  if (user.role.toUpperCase() === "ADMIN") {

    const result = await pool.query(
      "SELECT * FROM tasks WHERE project_id = $1 ORDER BY position ASC",
      [projectId]
    );
    return result.rows;
  }

 
  const result = await pool.query(
    `SELECT * FROM tasks 
     WHERE project_id = $1 AND assignee_id = $2 
     ORDER BY position ASC`,
    [projectId, user.id]
  );

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
    if (!task) throw new AppError("Task not found",404)

    
    if (user.role === "MEMBER") {
      const statusOrder = ["TODO", "IN_PROGRESS", "DONE"]

      if (statusOrder.indexOf(data.status) < statusOrder.indexOf(task.status)) {
        throw new AppError("Cannot move task backward",400)
      }
      data = { status: data.status }
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
