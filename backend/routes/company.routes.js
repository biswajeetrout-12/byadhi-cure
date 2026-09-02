import express from "express";
import { getCompany, updateCompany } from "../controllers/company.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getCompany);
router.put("/", requireAuth, requireAdmin, updateCompany);

export default router;
