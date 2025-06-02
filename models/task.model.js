import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    status: { type: String, enum: ["not started", "in progress", "completed"], default: "not started" },
    dueDate: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
      tags: [String], 
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
