import { Router } from "express";
import {
  createListing,
  getAllListings,
  getListingById,
} from "../controllers/listingControllers.mjs";
import { auth } from "../middleware/auth.mjs";

export const listingRoutes = Router();

listingRoutes.get("/", getAllListings);
listingRoutes.post("/create", auth, createListing);
listingRoutes.get("/:id", getListingById);
