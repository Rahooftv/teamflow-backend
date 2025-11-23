import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/user.model.js";
import AppError from "../../utils/app.error.js";

export const AuthService = {

  login: async (email, password) => {
   
    const user = await UserModel.findByEmail(email)
    if (!user) {
      throw new Error("invalid email or password")
    }

 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("invalid email or password");
    }

 
    const token = jwt.sign( { id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" } )

   
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },


  getMe: async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("user not found");
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },
};
