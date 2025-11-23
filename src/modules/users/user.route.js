
import express from "express";
import { UserController } from "./user.controller.js"
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = express.Router()


router.get("/members",authMiddleware, adminOnly, UserController.getMembers)

export default router;
