import { Router } from "express";
import {
  createListing,
  getAllListings,
} from "../controllers/listingControllers.mjs";
import { auth } from "../middleware/auth.mjs";

export const listingRoutes = Router();

listingRoutes.get("/", getAllListings);
listingRoutes.post("/create", auth, createListing);
