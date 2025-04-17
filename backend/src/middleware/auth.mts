import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest.mjs";

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const loginCookie = req.cookies["login"];

  if (!loginCookie) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const result = jwt.verify(loginCookie, "mysecretkey");

    if (!result) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id, role } = result as { id: string; role: string };
    req.user = { id, role: role as "user" | "company" };

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
