import express from "express"
import cookieParser from "cookie-parser"
import { connectDB } from "./src/config/db.js"
import errorMiddleware from "./src/middlewares/error.middleware.js"

const app = express()

app.use(express.json())
app.use(cookieParser())

// app.use("/api,auth",)

app.use(errorMiddleware)

app.listen(5000, async ()=> {

    console.log("server running")
    connectDB()

})