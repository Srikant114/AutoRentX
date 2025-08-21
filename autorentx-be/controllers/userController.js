// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ================================
   Small related data (constants)
   ================================ */
const SALT_ROUNDS = 10;

/* ================================
   Helpers
   ================================ */
// Generate JWT for a user
const generateToken = (userId) => {
  // keep payload minimal
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY);
};

// Basic field validation (minimal & readable)
const isValidEmail = (email = "") => /\S+@\S+\.\S+/.test(email);
const isValidPassword = (pwd = "") => typeof pwd === "string" && pwd.length >= 8;

/* ================================
   Register User
   ================================ */
export const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body || {};

    // Normalize inputs
    name = (name || "").trim();
    email = (email || "").trim().toLowerCase();

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid email." });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists." });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, password: hashedPassword });

    // Issue token
    const token = generateToken(user._id.toString());

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
    });
  } catch (error) {
    console.log("Register Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

/* ================================
   Login User
   ================================ */
export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body || {};

    // Normalize inputs
    email = (email || "").trim().toLowerCase();

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Issue token
    const token = generateToken(user._id.toString());

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};


/* ================================
   Get User Data (Profile)
   ================================ */
export const getUserData = async (req, res) => {
  try {
    // user is attached to req in auth middleware (decoded from token)
    const { user } = req;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("GetUserData Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};