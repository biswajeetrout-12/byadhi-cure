import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";
import { handleProductImageUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin only
router.post("/", requireAuth, requireAdmin, handleProductImageUpload, createProduct);
router.put("/:id", requireAuth, requireAdmin, handleProductImageUpload, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

export default router;
