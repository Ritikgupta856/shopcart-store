import express from "express";
import { addProduct, removeProduct, getAllProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/addproduct", addProduct);
router.post("/removeproduct", removeProduct);
router.get("/allproducts", getAllProducts);

export default router;
