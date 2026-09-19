import express from "express";
import { getOrders, getMyOrders } from "../controllers/order.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/orders", verifyToken, isAdmin, getOrders);
router.get("/orders/mine", verifyToken, getMyOrders);

export default router;
