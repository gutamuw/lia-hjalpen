import { Router } from "express";
import { registerUser } from "../controllers/authController.mjs";

export const authRoutes = Router();

authRoutes.post("/register-user", registerUser);
