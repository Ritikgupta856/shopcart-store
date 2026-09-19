import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadProductImage, uploadCategoryImage, uploadImage } from "../controllers/upload.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload/product", verifyToken, isAdmin, upload.single("product"), uploadProductImage);
router.post("/upload/category", verifyToken, isAdmin, upload.single("category"), uploadCategoryImage);
router.post("/upload/image", verifyToken, isAdmin, upload.single("image"), uploadImage);

export default router;
