import { Request, Response } from "express";
import User from "../models/User.mjs";
import bcrypt from "bcryptjs";

//registerUser
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, age, description, profileImage, cvLink } =
    req.body;

  try {
    if (!name || !email || !password || !age) {
      res.status(400).json({ message: "Missing required fields" });
    }
    if (password.length < 3) {
      res
        .status(400)
        .json({ message: "Password must be at least 3 characters" });
    }
    if (age < 18) {
      res.status(400).json({ message: "You must be at least 18 years old" });
    }

    //hash password
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);

    //post user to database
    const newUser = await User.create({
      name,
      email,
      password: hash,
      age,
      description,
      profileImage,
      cvLink,
    });

    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//registerCompany
