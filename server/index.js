import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import ConnectDb from "./database/db.js";
import userRoutes from "./routes/user.routes.js"
import courseRoute from "./routes/course.route"
dotenv.config({});

// default middleware
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// apis route
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/course", courseRoute)

const PORT = process.env.PORT || 3001;
ConnectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server run in PORT ${PORT}`)
    })
})