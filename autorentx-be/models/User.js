// models/User.js
import mongoose from "mongoose";


//    Related data (constants)
const USER_ROLES = ["owner", "user"]; // allowed roles in AutoRentX


//    User Schema
const userSchema = new mongoose.Schema(
  {
    // Full name of the user
    name: { type: String, required: true },

    // Email (must be unique)
    email: { type: String, required: true, unique: true },

    // Hashed password
    password: { type: String, required: true },

    // Role (defaults to "user")
    role: { type: String, enum: USER_ROLES, default: "user" },

    // Profile image URL (optional)
    image: { type: String, default: "" },
  },
  { timestamps: true } // adds createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

export default User;
