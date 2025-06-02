// controllers/comment.controller.js
import { Comment } from "../models/comment.model.js";

export const addComment = async (req, res) => {
  const { taskId } = req.params;
  const { content } = req.body;

  try {
    const comment = await Comment.create({
      task: taskId,
      author: req.user._id,
      content,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
};

export const getCommentsByTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const comments = await Comment.find({ task: taskId }).populate("author", "name email");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
};
