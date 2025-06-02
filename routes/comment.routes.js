// routes/comment.routes.js
import express from "express";
import { addComment, getCommentsByTask } from "../controllers/comment.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:taskId", protect, addComment);          // ➕ Add comment
router.get("/:taskId", protect, getCommentsByTask);    // 📄 Get comments by task

export default router;
