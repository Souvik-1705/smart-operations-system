import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import { protect,authorizeRoles } from "./middleware/authMiddleware.js";


dotenv.config();
connectDB();


const app=express();


app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API Running...")
})

app.get("/api/test", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/activity",activityRoutes);

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
})