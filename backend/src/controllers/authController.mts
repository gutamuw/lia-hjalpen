import { Request, Response } from "express";
import User from "../models/User.mjs";
import Company from "../models/Company.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, age, description, profileImage, cvLink } =
    req.body;

  try {
    if (!name || !email || !password || !age) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    if (password.length < 3) {
      res
        .status(400)
        .json({ message: "Password must be at least 3 characters" });
      return;
    }
    if (age < 18) {
      res.status(400).json({ message: "You must be at least 18 years old" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hash,
      age,
      description,
      profileImage,
      cvLink,
    });

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerCompany = async (req: Request, res: Response) => {
  const { name, email, password, description, profileImage, website } =
    req.body;

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newCompany = await Company.create({
      name,
      email,
      password: hash,
      description,
      profileImage,
      website,
    });

    res
      .status(201)
      .json({ message: "Company registered successfully", newCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: user._id, role: "user" }, "mysecretkey");
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

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("login");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginCompany = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    const company = await Company.findOne({ email });
    if (!company) {
      res.status(404).json({ message: "Company not found" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign({ id: company._id, role: "company" }, "mysecretkey");

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);

    res.cookie("login", token, {
      expires: currentDate,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login successful",
      company: {
        name: company.name,
        email: company.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
