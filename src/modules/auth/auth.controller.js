import { AuthService } from "./auth.service.js";

export const AuthController = {


  login: async (req, res, next) => {

    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.login(email, password);

  
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000 

      })

      res.status(200).json({ user })
    } catch (err) {
      next(err);
    }
  },


me: async (req, res, next) => {
  try {
    const user = await AuthService.getMe(req.user.id); 
    res.status(200).json({ user })
  } catch (err) {
    next(err);
  }
},

}
