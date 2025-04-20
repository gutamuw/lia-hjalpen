import { Request, Response } from "express";
import Listing from "../models/Listing.mjs";
import { AuthRequest } from "../types/AuthRequest.mjs";
import Company from "../models/Company.mjs";

export const createListing = async (req: AuthRequest, res: Response) => {
  const { title, description, category, type, email, link } = req.body;
  const { id, role } = req.user!; // Trust me - this is safe because of the auth middleware

  try {
    if (role !== "company") {
      res.status(403).json({ message: "Only companies can create listings" });
      return;
    }

    const newListing = new Listing({
      title,
      description,
      category,
      type,
      email,
      link,
      company: id,
    });

    await newListing.save();
    res.status(201).json(newListing);

    // Update the companies collection with this listing
    await Company.findByIdAndUpdate(
      id,
      {
        $push: { listings: newListing._id },
      },
      { new: true }
    );

    return;
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getAllListings = async (req: Request, res: Response) => {
  // should work for listings?category=frontend&type=remote, if not provided, return all listings
  // also adding pagnation and limit
  const { category, type, page, limit } = req.query;

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;
  const skip = (currentPage - 1) * currentLimit;

  try {
    const filter: any = {};

    if (category) {
      filter.category = { $regex: category, $options: "i" }; // Case-insensitive search
    }
    if (type) {
      filter.type = type;
    }

    const listings = await Listing.find(filter).skip(skip).limit(currentLimit);
    if (listings.length === 0) {
      res.status(404).json({ message: "No listings found" });
      return;
    }

    res.status(200).json(listings);
    return;
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getListingById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      res.status(404).json({ message: "Listing not found" });
      return;
    }
    res.status(200).json(listing);
    return;
  } catch (error) {
    console.error("Error fetching listing:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
