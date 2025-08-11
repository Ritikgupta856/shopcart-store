import express from "express";
import { addProduct, removeProduct, getAllProducts, getProductBySlug } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/products", addProduct);
router.delete("/products/:id", removeProduct);
router.get("/products", getAllProducts);
router.get("/products/:slug", getProductBySlug);

export default router;
