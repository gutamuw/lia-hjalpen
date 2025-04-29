import express from "express";
import upload from "../config/multer.mjs"; // Din multer-konfiguration
import { uploadProfilePicture } from "../controllers/uploadController.mjs"; // Din controller
import { auth } from "../middleware/auth.mjs";
import { uploadCV } from "../controllers/uploadCV.mjs";

const uploadRouter = express.Router();

// Rutt för att ladda upp profilbilden
uploadRouter.post("/avatar", auth, upload.single("file"), uploadProfilePicture);
uploadRouter.post("/cv", auth, upload.single("file"), uploadCV);

export default uploadRouter;
