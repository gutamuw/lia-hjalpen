import { Schema, model, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  email: string;
  password: string;
  description?: string;
  profileImage?: string;
  website?: string;
  listings: Schema.Types.ObjectId[]; // Array of listing IDs
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String },
  profileImage: { type: String },
  website: { type: String },
  listings: [{ type: Schema.Types.ObjectId, ref: "Listing" }], // Array of listing IDs
});

const Company = model<ICompany>("Company", companySchema);
export default Company;
