import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function formatUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ ok: false, message: "An account with this email already exists" });
    }

    const user = await User.create({ name, email, password, role: "User" });
    const token = signToken(user._id);

    return res.status(201).json({
      ok: true,
      token,
      user: formatUser(user),
    });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ ok: false, message: "Server error during registration" });
  }
}

// POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "Email and password are required" });
    }

    // Explicitly select password (it has select:false in schema)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ ok: false, message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ ok: false, message: "Invalid email or password" });
    }

    const token = signToken(user._id);

    return res.json({
      ok: true,
      token,
      user: formatUser(user),
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ ok: false, message: "Server error during login" });
  }
}

// GET /api/auth/me  (requires requireAuth middleware)
export async function getMe(req, res) {
  return res.json({ ok: true, user: formatUser(req.user) });
}
