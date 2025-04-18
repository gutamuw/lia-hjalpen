import { Router } from "express";
import { auth } from "../middleware/auth.mjs";
import {addFavorite} from "../controllers/userControllers.mjs";

const userRoutes = Router();

userRoutes.post("/users/:id/favorites/:listingId", addFavorite);