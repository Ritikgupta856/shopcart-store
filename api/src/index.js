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
app.use("/api/webhook", express.raw({ type: "application/json" }));


app.use(express.json({ limit: "5mb" }));

// database connection
connectDB().catch((err) => console.error("DB connection failed", err));


app.get("/", (req, res) => {
  res.send("Server is running on port 8000");
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),          
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});


// Route mounting
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", uploadRoutes);
app.use("/api", stripeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

// Start server (skipped on Vercel, which invokes the exported app directly)
if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`[server] Listening on port ${process.env.PORT || 3000}`);
  });
}

export default app;
