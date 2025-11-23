import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"
import { connectDB } from "./src/config/db.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import authRoutes from "./src/modules/auth/auth.route.js";
import userRoutes from "./src/modules/users/user.route.js";
import projectRoutes from "./src/modules/projects/project.routes.js";
import taskRoutes from "./src/modules/tasks/task.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true              
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", taskRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log("server running");
  connectDB();
});
