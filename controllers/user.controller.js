import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// JWT Generator
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register Controller
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
