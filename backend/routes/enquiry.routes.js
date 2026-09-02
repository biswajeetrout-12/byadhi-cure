import express from "express";
import {
  submitEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiry.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.post("/", requireAuth, submitEnquiry);

// Admin only
router.get("/", requireAuth, requireAdmin, getEnquiries);
  router.patch("/:id/status", requireAuth, requireAdmin, updateEnquiryStatus);
  router.delete("/:id", requireAuth, requireAdmin, deleteEnquiry);

export default router;
