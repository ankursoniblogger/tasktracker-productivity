import { Team } from "../models/team.model.js";
import { User } from "../models/user.model.js";

// CREATE TEAM
export const createTeam = async (req, res) => {
  const { name, description, members } = req.body;

  try {
    const team = await Team.create({
      name,
      description,
      members: members || [],
      createdBy: req.user._id,
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: "Failed to create team", error: err.message });
  }
};

// GET MY TEAMS
export const getMyTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      $or: [{ createdBy: req.user._id }, { members: req.user._id }],
    }).populate("members", "name email");

    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch teams", error: err.message });
  }
};

// ADD MEMBER TO TEAM
export const addMember = async (req, res) => {
  const { teamId } = req.params;
  const { userId } = req.body;

  try {
    const team = await Team.findById(teamId);

    if (!team) return res.status(404).json({ message: "Team not found" });
    if (team.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only creator can add members" });
    }

    if (team.members.includes(userId)) {
      return res.status(400).json({ message: "User already a member" });
    }

    team.members.push(userId);
    await team.save();

    res.status(200).json({ message: "Member added", team });
  } catch (err) {
    res.status(500).json({ message: "Failed to add member", error: err.message });
  }
};
