import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

interface CustomJwtPayload extends JwtPayload {
  data: {
    _id: string;
    email: string;
    username: string;
  };
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    token = token.split(" ").pop()?.trim() || "";

    const { data } = jwt.verify(token, secret) as CustomJwtPayload;

    req.user = data;

    next();
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error("Unknown error");
      res.status(400).json({ message: "Something went wrong" });
    }
  }
}
