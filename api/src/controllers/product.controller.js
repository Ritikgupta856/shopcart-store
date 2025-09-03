import { Product } from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, slug, description, image, price, category } = req.body;

    if (!name || !slug || !description || !image || !price || !category) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product({ name, slug, description, image, price, category });
    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product: deletedProduct });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query; 
    page = parseInt(page);
    limit = parseInt(limit);

    const products = await Product.find({})
      .populate("category", "_id name slug");


    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate("category", "_id name slug");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
