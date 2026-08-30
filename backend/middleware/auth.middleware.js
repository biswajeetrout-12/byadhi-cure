import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * requireAuth — verifies JWT and attaches user to req.user
 */
export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ ok: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ ok: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: "Invalid or expired token" });
  }
}

/**
 * requireAdmin — must be used after requireAuth
 * Allows only users with role === "admin"
 */
export function requireAdmin(req, res, next) {
  const role = typeof req.user?.role === "string" ? req.user.role.toLowerCase() : "";
  if (!req.user || role !== "admin") {
    return res.status(403).json({ ok: false, message: "Admin access required" });
  }
  next();
}
