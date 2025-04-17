import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  description?: string;
  profileImage?: string;
  cvLink?: string;
  favorites: string[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String },
  profileImage: { type: String, default: "/lia-user.jpg" },
  cvLink: { type: String },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
});

const User = model<IUser>("User", userSchema);
export default User;
