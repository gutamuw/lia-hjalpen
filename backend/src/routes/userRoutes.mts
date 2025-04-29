import { Router } from "express";
import { auth } from "../middleware/auth.mjs";
import {
  addFavorite,
  deleteFavorite,
  getAllFavorites,
  getUser,
} from "../controllers/userControllers.mjs";

export const userRoutes = Router();

userRoutes.post("/favorites/:listingId", auth, addFavorite);
userRoutes.get("/:id/favorites", auth, getAllFavorites);
userRoutes.get("/user", auth, getUser);
userRoutes.delete("/favorites/:listingId", auth, deleteFavorite);
