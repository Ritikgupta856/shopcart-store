import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import connectDB from "./db/database.js";
import cors from "cors";
import { Product } from "./models/product.model.js";
import { upload } from "./middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../src/utills/cloudinary.js";
import { Category } from "./models/category.model.js";
import { User } from "./models/user.model.js";
import { Stripe } from "stripe";
import { Order } from "./models/order.model.js";

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2020-08-27",
});

const app = express();
app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(cors());

dotenv.config({
  path: "./.env",
});

// database connection
connectDB();

app.get("/", (req, res) => {
  res.send("Express app is running");
});

app.use("/temp", express.static("/public/temp"));

app.post("/upload/product", upload.single("product"), async (req, res) => {
  try {
    const productLocalPath = req.file?.path;
    const product = await uploadOnCloudinary(productLocalPath);
    res.json({
      success: 1,
      image_URL: product.url,
    });
  } catch (error) {
    console.error("Error uploading product image to Cloudinary:", error);
  }
});
app.post("/upload/category", upload.single("category"), async (req, res) => {
  try {
    const categoryLocalPath = req.file?.path;
    const category = await uploadOnCloudinary(categoryLocalPath);
    res.json({
      success: 1,
      image_URL: category.url,
    });
  } catch (error) {
    console.error("Error uploading category image to Cloudinary:", error);
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!(firstname && lastname && email && password)) {
      res.status(400).send("All Fields are compulsory");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).send("User already exist");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    });

    const token = jwt.sign({ id: user._id, email }, "shhh", {
      expiresIn: "10hr",
    });

    user.token = token;

    res.json({
      success: 1,
      token,
      user,
    });
  } catch (error) {
    console.log("Failed to register user", error);
    res.status(500).send("Failed to register user");
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All Fields are compulsory");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User does not exist");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign({ id: user._id, email }, "shhh", {
      expiresIn: "10hr",
    });
    user.token = token;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.log("Failed to login user", error);
    res.status(500).send("Failed to login user");
  }
});

app.get("/users", async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log("Error Fetching Users:", error);
  }
});

app.post("/addproduct", async (req, res) => {
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
    res.json({
      success: 1,
      name: req.body.name,
    });
  } catch (error) {
    console.log("Error adding product:", error);
  }
});

app.post("/removeproduct", async (req, res) => {
  try {
    const productId = req.body.id;
    const deletedProduct = await Product.findOneAndDelete({ _id: productId });
    console.log(deletedProduct);
    res.json({
      success: true,
      name: deletedProduct.name,
    });
  } catch (error) {
    console.error("Error removing product:", error);
  }
});

app.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log("Error Fetching products:", error);
  }
});

app.get("/allcategories", async (req, res) => {
  try {
    let categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log("Error Fetching Categories:", error);
  }
});

app.post("/addcategory", async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      image: req.body.image,
    });

    await newCategory.save();
    console.log(newCategory);
    res.json({
      success: 1,
      name: req.body.name,
    });
  } catch (error) {
    console.log("Error adding Category:", error);
  }
});

app.post("/removecategory", async (req, res) => {
  try {
    const categoryId = req.body.id;
    const deletedcategory = await Category.findOneAndDelete({
      _id: categoryId,
    });
    console.log(deletedcategory);
    res.json({
      success: true,
      name: deletedcategory.name,
    });
  } catch (error) {
    console.error("Error removing Category:", error);
  }
});

app.post("/create-checkout-session", async (req, res) => {
  const { products, user, totalAmount } = req.body;

  const line_items = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const newOrder = new Order({
    products,
    user,
    totalAmount,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["IN"] },
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}`,
      metadata: { orderId: newOrder._id },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json("Internal server error");
  }
});

app.post("/webhook", async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.log(`Error message: ${err.message}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const data = event.data.object;
    const orderId = data.metadata.orderId;

    try {
      const order = await Order.findByIdAndUpdate(orderId, { paid: true });
      console.log("Updated Order:", order);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).send("Error updating order");
      return;
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  response.send();
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on ${process.env.PORT || 3000}`);
});
