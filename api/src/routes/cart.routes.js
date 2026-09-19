import express from "express";
import { calculateCartTotals } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/cart/calculate", calculateCartTotals);

export default router;
