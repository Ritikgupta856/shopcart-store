import express from "express";
import {
  addBanner,
  removeBanner,
  getAllBanners,
  getActiveBanners,
} from "../controllers/banner.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/banners", verifyToken, isAdmin, addBanner);
router.delete("/banners/:id", verifyToken, isAdmin, removeBanner);
router.get("/banners", verifyToken, isAdmin, getAllBanners);
router.get("/banners/active", getActiveBanners);

export default router;
