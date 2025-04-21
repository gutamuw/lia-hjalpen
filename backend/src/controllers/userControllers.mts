import { Request, Response } from "express";
import User from "../models/User.mjs";
import { AuthRequest } from "../types/AuthRequest.mjs";

export const addFavorite = async (req: AuthRequest, res: Response) => {
  const { id } = req.user!;
  const { listingId } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.favorites.includes(listingId)) {
      res.status(400).json({ message: "Listing already in favorites" });
      return;
    }

    user.favorites.push(listingId);
    await user.save();
    res.status(200).json({ message: "Listing added to favorites" });
    return;
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getAllFavorites = async (req: AuthRequest, res: Response) => {
  const { id } = req.user!;

  try {
    const user = await User.findById(id).populate("favorites");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.favorites.length === 0) {
      res.status(404).json({ message: "No favorites found" });
      return;
    }
    res.status(200).json(user.favorites);
    return;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const deleteFavorite = async (req: AuthRequest, res: Response) => {
  const { id } = req.user!;
  const { listingId } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!user.favorites.includes(listingId)) {
      res.status(400).json({ message: "Listing not in favorites" });
      return;
    }

    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== listingId
    );
    await user.save();
    res.status(200).json({ message: "Listing removed from favorites" });
    return;
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
