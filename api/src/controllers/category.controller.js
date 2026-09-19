import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { deleteFromCloudinary } from "../utills/cloudinary.js";

export const addCategory = async (req, res) => {
  try {
    const { name, slug, image, shortDescription, displayOrder, isActive } = req.body;

    if (!name || !slug || !image) {
      return res.status(400).json({ success: false, message: "Name, slug, and image are required" });
    }

    const newCategory = new Category({
      name,
      slug,
      image,
      shortDescription: shortDescription || "",
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      isActive: isActive !== undefined ? isActive : true,
    });
    await newCategory.save();

    res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, image, shortDescription, displayOrder, isActive } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    if (name !== undefined) category.name = name;
    if (slug !== undefined) category.slug = slug;
    if (shortDescription !== undefined) category.shortDescription = shortDescription;
    if (displayOrder !== undefined) category.displayOrder = Number(displayOrder);
    if (isActive !== undefined) category.isActive = isActive;

    if (image && image !== category.image) {
      const oldImage = category.image;
      category.image = image;
      await deleteFromCloudinary(oldImage);
    }

    await category.save();

    res.json({ success: true, category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeCategory = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    await deleteFromCloudinary(deletedCategory.image);

    res.json({ success: true, category: deletedCategory });
  } catch (error) {
    console.error("Error removing category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ displayOrder: 1, createdAt: 1 });
    res.json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, category });
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getProductsByCategorySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const products = await Product.find({ category: category._id });
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products by category slug:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
