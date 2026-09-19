import express from "express";
import {
  addCategory,
  removeCategory,
  getAllCategories,
  getProductsByCategorySlug
} from "../controllers/category.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/categories", verifyToken, isAdmin, addCategory);
router.delete("/categories/:id", verifyToken, isAdmin, removeCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:slug", getProductsByCategorySlug);

export default router;
