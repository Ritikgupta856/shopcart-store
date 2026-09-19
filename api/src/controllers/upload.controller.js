import { uploadOnCloudinary } from "../utills/cloudinary.js";

const ALLOWED_FOLDERS = ["banners", "deals"];

export const uploadProductImage = async (req, res) => {
  try {
    const product = await uploadOnCloudinary(req.file?.buffer, "products");
    if (!product) return res.status(500).json({ success: 0, message: "Upload failed" });
    res.json({ success: 1, image_URL: product.secure_url });
  } catch (error) {
    console.error("Error uploading product image to Cloudinary:", error);
    res.status(500).json({ success: 0, message: "Upload failed" });
  }
};

export const uploadCategoryImage = async (req, res) => {
  try {
    const category = await uploadOnCloudinary(req.file?.buffer, "categories");
    if (!category) return res.status(500).json({ success: 0, message: "Upload failed" });
    res.json({ success: 1, image_URL: category.secure_url });
  } catch (error) {
    console.error("Error uploading category image to Cloudinary:", error);
    res.status(500).json({ success: 0, message: "Upload failed" });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const requestedFolder = req.body?.folder;
    const folder = ALLOWED_FOLDERS.includes(requestedFolder) ? requestedFolder : "misc";
    const result = await uploadOnCloudinary(req.file?.buffer, folder);
    if (!result) return res.status(500).json({ success: 0, message: "Upload failed" });
    res.json({ success: 1, image_URL: result.secure_url });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ success: 0, message: "Upload failed" });
  }
};
