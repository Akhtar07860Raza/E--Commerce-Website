import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

import { connectDB } from "./server/config/db.js";
import productRoutes from "./server/routes/productRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import orderRoutes from "./server/routes/orderRoutes.js";
import uploadRoutes from "./server/routes/uploadRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {

  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

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

  // Development (Vite)
  if (process.env.NODE_ENV !== "production") {

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);

  } else {

    // Production: serve React build
    const distPath = path.join(__dirname, "dist");

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });

  }

  app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

}

startServer();