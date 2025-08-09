import express from "express";
import connectDB from "./db/database.js";
import cors from "cors";
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import stripeRoutes from "./routes/stripe.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(cors());

// database connection
connectDB();

app.get("/", (req, res) => {
  res.send("Express app is running");
});

app.use("/temp", express.static("/public/temp"));

// Route mounting
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", uploadRoutes);
app.use("/api", stripeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`[server] Listening on port ${process.env.PORT || 3000}`);
});
