import { Task } from "../models/task.model.js";
import { Team } from "../models/team.model.js";

import { sendEmail } from "../utils/email.js";
import { User } from "../models/user.model.js";

// CREATE TASK


export const createTask = async (req, res) => {
  const { title, description, priority, dueDate, assignedTo, team } = req.body;

  try {
    if (team && assignedTo) {
      const foundTeam = await Team.findById(team);
      if (!foundTeam) return res.status(404).json({ message: "Team not found" });

      const isMember = foundTeam.members.includes(assignedTo) || foundTeam.createdBy.toString() === assignedTo;
      if (!isMember) return res.status(403).json({ message: "User is not a member of this team" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      team,
      createdBy: req.user._id,
    });


    
    // Email Notification
    if (assignedTo) {
      const assignee = await User.findById(assignedTo);
      if (assignee?.email) {
        await sendEmail(
          assignee.email,
          "New Task Assigned",
          `You have been assigned a task: "${title}". Due by ${dueDate}.`
        );
      }
    }


    
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", error: err.message });
  }
};




// GET ALL TASKS for logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", error: err.message });
  }
};


// DELETE TASK
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, createdBy: req.user._id });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
};

// Update Task Status 

export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!["not started", "in progress", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Optional: Ensure only assigned user or creator can update
    if (
      task.assignedTo?.toString() !== req.user._id.toString() &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized to update this task" });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Status updated", task });
  } catch (err) {
    res.status(500).json({ message: "Error updating task status", error: err.message });
  }
};






export const getTeamProgress = async (req, res) => {
  const { teamId } = req.params;

  try {
    const tasks = await Task.find({ team: teamId });

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const inProgress = tasks.filter((t) => t.status === "in progress").length;
    const notStarted = tasks.filter((t) => t.status === "not started").length;

    res.status(200).json({
      teamId,
      total,
      completed,
      inProgress,
      notStarted,
      progressPercent: total ? Math.round((completed / total) * 100) : 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching progress", error: err.message });
  }
};
