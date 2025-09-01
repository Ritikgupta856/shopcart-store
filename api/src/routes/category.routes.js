import express from "express";
import {
  addCategory,
  removeCategory,
  getAllCategories,
  getProductsByCategorySlug
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/categories", addCategory);
router.delete("/categories/:id", removeCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:slug", getProductsByCategorySlug);

export default router;
