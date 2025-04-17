import express from "express";
import mongoose from "mongoose";
import { registerUser } from "./controllers/authController.mjs";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from api!");
});

app.use("/", registerUser);

app.listen(3000, () => {
  mongoose.connect(
    "mongodb+srv://luddeelverskog:2QqoNXpoIMMV1Drc@cluster1.rac0iky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
  );
  console.log(
    "Server is running on http://localhost:3000, connected to MongoDB"
  );
});
