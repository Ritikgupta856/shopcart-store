import express from "express";
import {
  submitReview,
  getProductReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/reviews", verifyToken, submitReview);
router.get("/reviews/product/:productId", getProductReviews);
router.get("/reviews", verifyToken, isAdmin, getAllReviews);
router.patch("/reviews/:id/status", verifyToken, isAdmin, updateReviewStatus);
router.delete("/reviews/:id", verifyToken, isAdmin, deleteReview);

export default router;
