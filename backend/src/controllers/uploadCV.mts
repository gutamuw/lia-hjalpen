import { Request, Response } from "express";
import User from "../models/User.mjs";
import Company from "../models/Company.mjs";
import cloudinary from "../config/cloudinary.mjs";
import streamifier from "streamifier";
import { AuthRequest } from "../types/AuthRequest.mjs";

export const uploadCV = async (req: AuthRequest, res: Response) => {
  try {
    const file = req.file;
    const { id, role } = req.user!; // Vi antar att "role" är antingen "user" eller "company"

    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    if (!file.mimetype.startsWith("application/pdf")) {
      res
        .status(400)
        .json({ message: "Invalid file type. Only PDF files are allowed." });
      return;
    }

    // Ladda upp filen till Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "CVs",
          resource_type: "raw",
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

    if (role === "user") {
      await User.findByIdAndUpdate(id, {
        cvLink: result.secure_url,
      });
    } else if (role === "company") {
      await Company.findByIdAndUpdate(id, {
        cvLink: result.secure_url,
      });
    }
    res
      .status(200)
      .json({ message: "CV uploaded successfully", url: result.secure_url });
  } catch (error) {
    console.error("Error uploading CV:", error);
    res.status(500).json({ message: "Error uploading CV" });
  }
};
