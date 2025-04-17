import { Request, Response } from "express";
import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: user._id }, "mysecretkey");
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);

    res.cookie("login", token, {
      expires: currentDate,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
