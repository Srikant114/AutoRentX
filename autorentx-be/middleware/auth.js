// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ================================
   Auth Middleware: protect
   - Verifies Bearer token
   - Attaches sanitized user to req.user
   ================================ */
export const protect = async (req, res, next) => {
  try {
    // Expecting: Authorization: Bearer <token>
    const authHeader = req.headers.authorization || "";
    const isBearer = authHeader.startsWith("Bearer ");

    if (!isBearer) {
      return res.status(401).json({ success: false, message: "Not authorized." });
    }

    const token = authHeader.split(" ")[1];

    // Verify token (use verify, not decode)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // decoded payload should have userId (as set in your controller)
    const { userId } = decoded || {};
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authorized." });
    }

    // Attach user (excluding password) to request
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Not authorized." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
