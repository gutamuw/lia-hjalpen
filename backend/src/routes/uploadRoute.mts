import express from "express";
import upload from "../config/multer.mjs"; // Din multer-konfiguration
import { uploadProfilePicture } from "../controllers/uploadController.mjs"; // Din controller
import { auth } from "../middleware/auth.mjs";

const uploadRouter = express.Router();

// Rutt för att ladda upp profilbilden
uploadRouter.post("/", auth, upload.single("file"), uploadProfilePicture);

export default uploadRouter;
