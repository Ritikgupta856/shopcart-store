import express from "express";
import {
  addCategory,
  removeCategory,
  getAllCategories,
  getCategoryBySlug
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/categories", addCategory);
router.delete("/categories/:id", removeCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:slug", getCategoryBySlug);

export default router;
