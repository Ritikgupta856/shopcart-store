import { Category } from "../models/category.model.js";

export const addCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      image: req.body.image,
    });
    await newCategory.save();
    console.log(newCategory);
    res.json({ success: 1, name: req.body.name });
  } catch (error) {
    console.log("Error adding Category:", error);
  }
};

export const removeCategory = async (req, res) => {
  try {
    const categoryId = req.body.id;
    const deletedcategory = await Category.findOneAndDelete({ _id: categoryId });
    console.log(deletedcategory);
    res.json({ success: true, name: deletedcategory.name });
  } catch (error) {
    console.error("Error removing Category:", error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    let categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log("Error Fetching Categories:", error);
  }
};
