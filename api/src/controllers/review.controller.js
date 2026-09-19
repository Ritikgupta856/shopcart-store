import { Review } from "../models/review.model.js";

export const submitReview = async (req, res) => {
  try {
    const { productId, rating, text } = req.body;
    const userId = req.user._id;

    if (!productId || !rating) {
      return res.status(400).json({ success: false, message: "Product and rating are required" });
    }
    if (Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
    }

    const review = await Review.findOneAndUpdate(
      { product: productId, user: userId },
      { rating: Number(rating), text: text || "", status: "pending" },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({ success: true, review });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId, status: "approved" })
      .populate("user", "fullname")
      .sort({ createdAt: -1 });

    const count = reviews.length;
    const avgRating = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
    const breakdown = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => r.rating === star).length,
      percent: count > 0 ? Math.round((reviews.filter((r) => r.rating === star).length / count) * 100) : 0,
    }));

    res.json({
      success: true,
      reviews,
      avgRating: Math.round(avgRating * 10) / 10,
      count,
      breakdown,
    });
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user", "fullname email")
      .populate("product", "name slug image")
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const review = await Review.findByIdAndUpdate(id, { status }, { new: true });
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    res.json({ success: true, review });
  } catch (error) {
    console.error("Error updating review status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }
    res.json({ success: true, review: deleted });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
