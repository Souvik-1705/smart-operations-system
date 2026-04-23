import express from "express";
import { createTask,getTasks,updateTask } from "../controllers/taskController.js";
import { protect,authorizeRoles } from "../middleware/authMiddleware.js";

const router=express.Router();

//Only admin and manager can create
router.post("/",protect,authorizeRoles("admin","manager"),createTask);

//All logged in user can view
router.get("/",protect,getTasks);

//Update Task
router.put("/:id",protect,updateTask);

export default router;