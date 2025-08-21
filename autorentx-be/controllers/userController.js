// controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ================================
   Helpers
   ================================ */

// create a JWT for the given user id
const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) throw new Error("JWT secret not configured");
  return jwt.sign({ id: userId }, secret);
};

// basic field validation
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

/* ================================
   Register User
   ================================ */
export const registerUser = async (req, res) => {
  try {
    const name = (req.body?.name || "").trim();
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";

    // validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Fill in all the details" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    // check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // create user
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    // token
    const token = generateToken(user._id.toString());
    return res.json({ success: true, token });
  } catch (err) {
    console.log("Register Error:", err.message);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

/* ================================
   Login User
   ================================ */
export const loginUser = async (req, res) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());
    return res.json({ success: true, token });
  } catch (err) {
    console.log("Login Error:", err.message);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
