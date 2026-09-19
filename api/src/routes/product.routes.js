import express from "express";
import { addProduct, removeProduct, getAllProducts, getProductBySlug } from "../controllers/product.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/products", verifyToken, isAdmin, addProduct);
router.delete("/products/:id", verifyToken, isAdmin, removeProduct);
router.get("/products", getAllProducts);
router.get("/products/:slug", getProductBySlug);

export default router;
