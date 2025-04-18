import { Request, Response } from 'express';
import User from '../models/User.mjs';

export const addFavorite = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { listingId } = req.body;
    
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
    
}