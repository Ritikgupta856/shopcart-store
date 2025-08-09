import { Product } from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
    });
    await newProduct.save();
    console.log(newProduct);
    res.json({ success: 1, name: req.body.name });
  } catch (error) {
    console.log("Error adding product:", error);
  }
};

export const removeProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    const deletedProduct = await Product.findOneAndDelete({ _id: productId });
    console.log(deletedProduct);
    res.json({ success: true, name: deletedProduct.name });
  } catch (error) {
    console.error("Error removing product:", error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log("Error Fetching products:", error);
  }
};
