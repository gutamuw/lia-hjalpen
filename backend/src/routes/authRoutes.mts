import { Router } from "express";
import {
  loginCompany,
  loginUser,
  logout,
  registerCompany,
  registerUser,
} from "../controllers/authController.mjs";
import upload from "../config/multer.mjs";

export const authRoutes = Router();

authRoutes.post("/register-user", upload.single("profileImage"), registerUser);
authRoutes.post("/register-company", registerCompany);
authRoutes.post("/login-user", loginUser);
authRoutes.post("/login-company", loginCompany);
authRoutes.post("/logout", logout);
