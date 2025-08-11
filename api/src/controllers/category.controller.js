import { Category } from "../models/category.model.js";

export const addCategory = async (req, res) => {
  try {
    const { name, slug, image } = req.body;

    if (!name || !slug || !image) {
      return res.status(400).json({ success: false, message: "Name, slug, and image are required" });
    }

    const newCategory = new Category({ name, slug, image });
    await newCategory.save();

    res.status(201).json({ success: true, category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
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

    res.json({ success: true, category: deletedCategory });
  } catch (error) {
    console.error("Error removing category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
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
