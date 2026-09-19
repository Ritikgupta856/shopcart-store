import express from "express";
import { addCoupon, removeCoupon, getAllCoupons } from "../controllers/coupon.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/coupons", verifyToken, isAdmin, addCoupon);
router.delete("/coupons/:id", verifyToken, isAdmin, removeCoupon);
router.get("/coupons", verifyToken, isAdmin, getAllCoupons);

export default router;
