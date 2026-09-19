import express from "express";
import { register, login, getUsers } from "../controllers/auth.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/users", verifyToken, isAdmin, getUsers);

export default router;
