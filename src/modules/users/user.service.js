import { UserModel } from "./user.model.js";

export const UserService = {
  getMembers: async () => {
    
    return await UserModel.getAllMembers()
  },
};
