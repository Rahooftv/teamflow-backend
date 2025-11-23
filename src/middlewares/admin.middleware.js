import AppError from "../utils/app.error.js";

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
     return next(new AppError("Admin access only", 403))
  }
  next();
};
