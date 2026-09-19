import express from "express";
import {
  addDeal,
  removeDeal,
  getAllDeals,
  getActiveDeals,
} from "../controllers/deal.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/deals", verifyToken, isAdmin, addDeal);
router.delete("/deals/:id", verifyToken, isAdmin, removeDeal);
router.get("/deals", verifyToken, isAdmin, getAllDeals);
router.get("/deals/active", getActiveDeals);

export default router;
