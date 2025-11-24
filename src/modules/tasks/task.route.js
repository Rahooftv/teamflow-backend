import express from "express";
import { TaskController } from "./task.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = express.Router({ mergeParams: true })

router.get(
  "/projects/:projectId/tasks",
  authMiddleware,
  TaskController.getTasksByProject
);
router.post(
  "/projects/:projectId/tasks",
  authMiddleware,
  adminOnly,
  TaskController.createTask
);

router.get("/tasks/:id", authMiddleware, TaskController.getTaskById);
router.put("/tasks/:id", authMiddleware, TaskController.updateTask);
router.patch(
  "/tasks/:id/position",
  authMiddleware,
  TaskController.updateTaskPosition
);
router.delete(
  "/tasks/:id",
  authMiddleware,
  adminOnly,
  TaskController.deleteTask
);

export default router;
