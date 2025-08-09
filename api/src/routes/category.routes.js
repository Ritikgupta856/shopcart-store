import express from "express";
import { addCategory, removeCategory, getAllCategories } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/addcategory", addCategory);
router.post("/removecategory", removeCategory);
router.get("/allcategories", getAllCategories);

export default router;
