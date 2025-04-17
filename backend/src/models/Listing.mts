import { Document, model, Schema, Types } from "mongoose";

export interface IListing extends Document {
  title: string;
  description: string;
  category: string;
  type: "on-site" | "hybrid" | "remote";
  email: string;
  link: string;
  company: Types.ObjectId; // Reference to the company that created the listing
}

const listingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: {
      type: String,
      enum: ["on-site", "hybrid", "remote"],
      required: true,
    },
    email: { type: String, required: true },
    link: { type: String, required: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Listing = model<IListing>("Listing", listingSchema);
export default Listing;
