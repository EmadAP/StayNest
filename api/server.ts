import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth";
import listingRoutes from "./routes/listing";
import { MONGO_URI, PORT } from "./util/config";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(authRoutes);
app.use(listingRoutes);

// Connect DB and Start Server
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
