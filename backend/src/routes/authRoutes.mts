import { Router } from "express";
import {
  loginCompany,
  loginUser,
  registerCompany,
  registerUser,
} from "../controllers/authController.mjs";

export const authRoutes = Router();

authRoutes.post("/register-user", registerUser);
authRoutes.post("/register-company", registerCompany);
authRoutes.post("/login-user", loginUser);
authRoutes.post("/login-company", loginCompany);
