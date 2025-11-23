import express from "express";
import { ProjectController } from "./project.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, ProjectController.getProjects);
router.get("/:id", authMiddleware, ProjectController.getProjectById);
router.post(
  "/create",
  authMiddleware,
  adminOnly,
  ProjectController.createProject
);
router.put(
  "/update/:id",
  authMiddleware,
  adminOnly,
  ProjectController.updateProject
);
router.delete(
  "/delete/:id",
  authMiddleware,
  adminOnly,
  ProjectController.deleteProject
);

export default router;
