import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController.mjs";

export const authRoutes = Router();

authRoutes.post("/register-user", registerUser);
//authRoutes.post("/register-company", registerUser);
authRoutes.post("/login-user", loginUser);
//authRoutes.post("/login-company", registerUser);
