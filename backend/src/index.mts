import express from "express";
import mongoose from "mongoose";
import { authRoutes } from "./routes/authRoutes.mjs";
import cookieParser from "cookie-parser";
import { listingRoutes } from "./routes/listingRoutes.mjs";
import { userRoutes } from "./routes/userRoutes.mjs";
import uploadRouter from "./routes/uploadRoute.mjs";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// Skapa __dirname för ES-moduler
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//env variabler
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));

// Gör public-mappen tillgänglig för statiska filer
app.use("/", express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send("Hello from api!");
});

app.use("/", authRoutes);
app.use("/listings", listingRoutes);
app.use("/users", userRoutes);
app.use("/upload", uploadRouter);

app.listen(3000, () => {
  mongoose.connect(MONGO_URI);
  console.log(
    "Server is running on http://localhost:3000, connected to MongoDB"
  );
});
