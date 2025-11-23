import { ProjectService } from "./project.service.js";

export const ProjectController = {

  getProjects: async (req, res, next) => {

    try {
      const projects = await ProjectService.getProjects(req.user)
      res.status(200).json({ projects })
    } catch (err) {
      next(err);
    }

  },



  getProjectById: async (req, res, next) => {

    try {
      const project = await ProjectService.getProjectById(req.params.id)
      if (!project) return res.status(404).json({ message: "Project not found" })
      res.status(200).json({ project })
    } catch (err) {
      next(err);
    }

  },

  createProject: async (req, res, next) => {

    try {
      const project = await ProjectService.createProject({ ...req.body, created_by: req.user.id })
      res.status(201).json({ project })
    } catch (err) {
      next(err);
    }

  },

  updateProject: async (req, res, next) => {

    try {
      const project = await ProjectService.updateProject(req.params.id, req.body)
      res.status(200).json({ project });
    } catch (err) {
      next(err);
    }
  },

  deleteProject: async (req, res, next) => {

    try {
      const project = await ProjectService.deleteProject(req.params.id)
      res.status(200).json({ project })
    } catch (err) {
      next(err);
    }
  },

}

