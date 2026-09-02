import express from "express";
import { register, login, googleLogin, getMe, getUsers, getRegisteredUserCount, createAdminUser, updateProfile, changePassword } from "../controllers/auth.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/me", requireAuth, getMe);
router.patch("/me", requireAuth, updateProfile);
router.patch("/me/password", requireAuth, changePassword);
router.get("/registered-count", requireAuth, requireAdmin, getRegisteredUserCount);
router.get("/users", requireAuth, requireAdmin, getUsers);
router.post("/users", requireAuth, requireAdmin, createAdminUser);

export default router;
