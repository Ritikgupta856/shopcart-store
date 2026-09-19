import { uploadOnCloudinary } from "../utills/cloudinary.js";


export const uploadProductImage = async (req, res) => {
  try {
    const product = await uploadOnCloudinary(req.file?.buffer);
    if (!product) return res.status(500).json({ success: 0, message: "Upload failed" });
    res.json({ success: 1, image_URL: product.url });
  } catch (error) {
    console.error("Error uploading product image to Cloudinary:", error);
    res.status(500).json({ success: 0, message: "Upload failed" });
  }
};

export const uploadCategoryImage = async (req, res) => {
  try {
    const category = await uploadOnCloudinary(req.file?.buffer);
    if (!category) return res.status(500).json({ success: 0, message: "Upload failed" });
    res.json({ success: 1, image_URL: category.url });
  } catch (error) {
    console.error("Error uploading category image to Cloudinary:", error);
    res.status(500).json({ success: 0, message: "Upload failed" });
  }
};
