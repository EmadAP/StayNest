import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI || !process.env.SECRET) {
  throw new Error("Missing required environment variables");
}

export const MONGO_URI = process.env.MONGO_URI;
export const SECRET = process.env.SECRET;
export const PORT = process.env.PORT || 5000;
