import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";

import { connectDB } from "./server/config/db.js";
import productRoutes from "./server/routes/productRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import orderRoutes from "./server/routes/orderRoutes.js";
import uploadRoutes from "./server/routes/uploadRoutes.js";

async function startServer() {

  const app = express();
  const PORT = 3000;

  // Connect Database
  await connectDB();

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.use("/api/products", productRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/upload", uploadRoutes);

  // Static uploads folder
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // Vite Dev Middleware
  if (process.env.NODE_ENV !== "production") {

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });

    app.use(vite.middlewares);

  } else {

    app.use(express.static("dist"));

  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

}

startServer();