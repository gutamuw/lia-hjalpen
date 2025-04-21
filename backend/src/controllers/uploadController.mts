import { Request, Response } from "express";
import User from "../models/User.mjs";
import Company from "../models/Company.mjs";
import cloudinary from "../config/cloudinary.mjs";
import streamifier from "streamifier";
import { AuthRequest } from "../types/AuthRequest.mjs";

// Hjälpfunktion för att ladda upp fil till Cloudinary
export const uploadToCloudinary = (file: Express.Multer.File) => {
  return new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "profile_pictures",
        resource_type: "image",
        transformation: [
          { width: 500, height: 500, crop: "auto", gravity: "auto" },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

// Profilbilduppladdning (användare eller företag)
export const uploadProfilePicture = async (
  req: any, //should be typed as AuthRequestWithFile or something similar
  res: Response
) => {
  try {
    const { id, role } = req.user!; // Vi antar att "role" är antingen "user" eller "company"
    const file = req.file;

    // Validera om filen finns
    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    // Validera filtyp (bara bildfiler som jpg, jpeg, png)
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      res.status(400).json({
        message: "Invalid file type. Only jpg, png, and jpeg are allowed.",
      });
      return;
    }

    // Ladda upp filen till Cloudinary
    const result = await uploadToCloudinary(file);

    // Beroende på om det är en användare eller företag, uppdatera rätt modell
    if (role === "user") {
      await User.findByIdAndUpdate(id, {
        profileImage: result.secure_url,
      });
    } else if (role === "company") {
      await Company.findByIdAndUpdate(id, {
        profileImage: result.secure_url,
      });
    } else {
      res.status(400).json({ message: "Invalid user role" });
      return;
    }

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      url: result.secure_url,
    });
    return;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
