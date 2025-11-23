import { UserService } from "./user.service.js";

export const UserController = {
  getMembers: async (req, res, next) => {
    try {
      const members = await UserService.getMembers();
      res.status(200).json({ members });
    } catch (err) {
      next(err);
    }
  },
};
