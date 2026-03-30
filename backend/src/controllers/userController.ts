import { Request, Response } from "express";
import User from "../models/User";

const secret = process.env.JWT_SECRET || "";
const expiration = "24h";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.error("Unknown error");
      res.status(400).json({ message: "Something went wrong" });
    }
  }
};

export default {
  register,
};
