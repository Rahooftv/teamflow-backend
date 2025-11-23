import { TaskService } from "./task.service.js";
import AppError from "../../utils/app.error.js";

export const TaskController = {

getTasksByProject: async (req, res, next) => {
  try {
    const projectId = parseInt(req.params.projectId);
    if (isNaN(projectId)) throw new AppError("Invalid project ID", 400);

    const filters = {
      search: req.query.search || null,
      status: req.query.status || null,
      priority: req.query.priority || null,
      assignee: req.query.assignee || null,
    };

    const tasks = await TaskService.getTasksByProject(projectId, req.user, filters);

    res.status(200).json({ tasks });
  } catch (err) {
    next(err);
  }
},


  getTaskById: async (req, res, next) => {
    try {
      const task = await TaskService.getTaskById(req.params.id, req.user);
      res.status(200).json({ task });
    } catch (err) {
      next(err)
    }
  },


createTask: async (req, res, next) => {
  try {
    const project_id = req.params.projectId; 

    if (!project_id) {
      throw new AppError("Project ID missing in URL", 400);
    }

    const taskData = {
      project_id,
      ...req.body
    };

    const task = await TaskService.createTask(taskData);

    res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
},

updateTask: async (req, res, next) => {

  try {
    const task = await TaskService.updateTask(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({ task })
  } catch (err) {
    next(err);
  }
},



  updateTaskPosition: async (req, res, next) => {
    try {
      const { position, status } = req.body;
      const task = await TaskService.updatePosition(req.params.id, position, status, req.user);
      res.status(200).json({ task })
    } catch (err) {
      next(err)
    }
  },


  deleteTask: async (req, res, next) => {
    try {
      const task = await TaskService.deleteTask(req.params.id)
      res.status(200).json({ task })
    } catch (err) {
      next(err)
    }
  },

}
