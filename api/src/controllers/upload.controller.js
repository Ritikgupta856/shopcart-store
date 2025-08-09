import { uploadOnCloudinary } from "../utills/cloudinary.js";


export const uploadProductImage = async (req, res) => {
  try {
    const productLocalPath = req.file?.path;
    const product = await uploadOnCloudinary(productLocalPath);
    res.json({ success: 1, image_URL: product.url });
  } catch (error) {
    console.error("Error uploading product image to Cloudinary:", error);
  }
};

export const uploadCategoryImage = async (req, res) => {
  try {
    const categoryLocalPath = req.file?.path;
    const category = await uploadOnCloudinary(categoryLocalPath);
    res.json({ success: 1, image_URL: category.url });
  } catch (error) {
    console.error("Error uploading category image to Cloudinary:", error);
  }
};
