import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
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

function configuredRole(email, password) {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (normalizedEmail === process.env.SUPERADMIN_EMAIL?.trim().toLowerCase() && password === process.env.SUPERADMIN_PASSWORD) {
    return "Superadmin";
  }
  if (normalizedEmail === process.env.ADMIN_EMAIL?.trim().toLowerCase() && password === process.env.ADMIN_PASSWORD) {
    return "Admin";
  }
  return "User";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
}

function isValidPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(String(password));
}

// POST /api/auth/register
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: "Name, email and password are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, message: "Please provide a valid email address" });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ ok: false, message: "Password must be at least 8 characters, include a letter and a number, and may contain special characters" });
    }

    const role = configuredRole(email, password);
    const existing = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
    if (existing) {
      if (role !== "User" && await existing.comparePassword(password)) {
        existing.role = role;
        existing.status = "Active";
        await existing.save();
        const token = signToken(existing._id);
        return res.status(200).json({ ok: true, token, user: formatUser(existing) });
      }
      return res.status(409).json({ ok: false, message: "An account with this email already exists" });
    }

    const user = await User.create({ name, email: email.trim().toLowerCase(), password, role });
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
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, message: "Please provide a valid email address" });
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

// POST /api/auth/google
export async function googleLogin(req, res) {
  try {
    const { credential } = req.body;
    if (!credential || !process.env.GOOGLE_CLIENT_ID) {
      return res.status(400).json({ ok: false, message: "Google sign-in is not configured" });
    }

    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
    const claims = await response.json();
    if (!response.ok || claims.aud !== process.env.GOOGLE_CLIENT_ID || claims.email_verified !== "true" || !claims.email) {
      return res.status(401).json({ ok: false, message: "Invalid Google credentials" });
    }

    const email = claims.email.trim().toLowerCase();
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: claims.name?.trim() || email.split("@")[0],
        email,
        password: randomBytes(32).toString("hex"),
        role: "User",
        status: "Active",
      });
    }

    return res.json({ ok: true, token: signToken(user._id), user: formatUser(user) });
  } catch (error) {
    console.error("google login error:", error);
    return res.status(401).json({ ok: false, message: "Google sign-in failed" });
  }
}

// GET /api/auth/me  (requires requireAuth middleware)
export async function getMe(req, res) {
  return res.json({ ok: true, user: formatUser(req.user) });
}

// GET /api/auth/users [admin only]
export async function getUsers(req, res) {
  try {
    const users = await User.find({ role: { $in: ["Admin", "Superadmin"] } }).sort({ createdAt: -1 }).select("-password");
    return res.json({ ok: true, data: users.map(formatUser) });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Failed to fetch users" });
  }
}

// GET /api/auth/registered-count [admin only]
export async function getRegisteredUserCount(req, res) {
  try {
    const count = await User.countDocuments({ role: "User" });
    return res.json({ ok: true, data: { count } });
  } catch (error) {
    return res.status(500).json({ ok: false, message: "Failed to fetch registered user count" });
  }
}

// POST /api/auth/users [admin only]
export async function createAdminUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: "Name, email and password are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, message: "Please provide a valid email address" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.exists({ email: normalizedEmail });
    if (existing) return res.status(409).json({ ok: false, message: "An account with this email already exists" });

    const user = await User.create({ name: name.trim(), email: normalizedEmail, password, role: "Admin", status: "Active" });
    return res.status(201).json({ ok: true, data: formatUser(user) });
  } catch (error) {
    return res.status(400).json({ ok: false, message: "Failed to create admin user" });
  }
}

// PATCH /api/auth/me [authenticated user]
export async function updateProfile(req, res) {
  try {
    const updates = {};
    if (typeof req.body.name === "string" && req.body.name.trim()) updates.name = req.body.name.trim();
    if (typeof req.body.email === "string" && req.body.email.trim()) updates.email = req.body.email.trim().toLowerCase();
    if (updates.email && !isValidEmail(updates.email)) {
      return res.status(400).json({ ok: false, message: "Please provide a valid email address" });
    }
    const user = await User.findByIdAndUpdate(req.user._id, { $set: updates }, { new: true, runValidators: true });
    return res.json({ ok: true, user: formatUser(user) });
  } catch (error) {
    return res.status(400).json({ ok: false, message: "Failed to update account" });
  }
}

// PATCH /api/auth/me/password [authenticated user]
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ ok: false, message: "Current and new passwords are required" });
    }
    if (!isValidPassword(newPassword)) {
      return res.status(400).json({ ok: false, message: "New password must be at least 8 characters, include a letter and a number, and may contain special characters" });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ ok: false, message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    return res.json({ ok: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ ok: false, message: "Failed to update password" });
  }
}
