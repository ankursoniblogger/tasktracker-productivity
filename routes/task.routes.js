import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { updateTaskStatus } from "../controllers/task.controller.js";
import { getTeamProgress } from "../controllers/task.controller.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// Protected routes
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.patch("/:taskId/status", protect, updateTaskStatus);

router.get("/team/:teamId/progress", protect, getTeamProgress);

export default router;
