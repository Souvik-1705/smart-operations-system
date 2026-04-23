import express from "express";
import { getLogs } from "../controllers/activityController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only admin can see logs
router.get("/logs", protect, authorizeRoles("admin"), getLogs);

export default router;