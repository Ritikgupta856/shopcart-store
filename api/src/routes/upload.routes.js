import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadProductImage, uploadCategoryImage } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/upload/product", upload.single("product"), uploadProductImage);
router.post("/upload/category", upload.single("category"), uploadCategoryImage);

export default router;
