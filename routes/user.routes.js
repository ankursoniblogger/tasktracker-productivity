import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


// Protected test route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected route",
    user: req.user,
  });
});



export default router;
