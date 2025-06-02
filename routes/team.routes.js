import express from "express";
import {
  createTeam,
  getMyTeams,
  addMember,
} from "../controllers/team.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createTeam);
router.get("/", protect, getMyTeams);
router.post("/:teamId/add-member", protect, addMember);

export default router;
