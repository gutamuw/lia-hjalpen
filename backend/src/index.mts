import express from "express";
import mongoose from "mongoose";
import { authRoutes } from "./routes/authRoutes.mjs";
import cookieParser from "cookie-parser";
import { listingRoutes } from "./routes/listingRoutes.mjs";
import { userRoutes } from "./routes/userRoutes.mjs";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from api!");
});

app.use("/", authRoutes);
app.use("/listings", listingRoutes);
app.use("/users", userRoutes)

app.listen(3000, () => {
  mongoose.connect(
    "mongodb+srv://luddeelverskog:2QqoNXpoIMMV1Drc@cluster1.rac0iky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  );
  console.log(
    "Server is running on http://localhost:3000, connected to MongoDB"
  );
});
