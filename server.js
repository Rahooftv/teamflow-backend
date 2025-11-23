import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js"
import errorMiddleware from "./src/middlewares/error.middleware.js"
import authRoutes from "./src/modules/auth/auth.route.js"

dotenv.config(); 

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)

app.use(errorMiddleware)

const PORT = process.env.PORT

app.listen(PORT, async ()=> {

    console.log("server running")
    connectDB()

})