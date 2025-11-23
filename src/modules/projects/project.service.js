import { ProjectModel } from "./project.model.js";

export const ProjectService = {
  getProjects: async (user) => {
    if (user.role === "ADMIN") return await ProjectModel.getAll();
    return await ProjectModel.getAllByMember(user.id);
  },

  getProjectById: async (id) => {
    return await ProjectModel.getById(id);
  },

  createProject: async (data) => {
    return await ProjectModel.create(data);
  },

  updateProject: async (id, data) => {
    return await ProjectModel.update(id, data);
  },

  deleteProject: async (id) => {
    return await ProjectModel.delete(id);
  },
};
