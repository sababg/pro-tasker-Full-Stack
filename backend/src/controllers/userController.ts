import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import generateToken from "../utils/generateToken";

const secret = process.env.JWT_SECRET || "";
const expiration = "2d";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
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

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const currentUSer = await User.findOne({ email });

    console.log("currentUSer", currentUSer);

    if (!currentUSer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const correctPassword = await currentUSer.isCorrectPassword(password);

    if (!correctPassword) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const payload = {
      _id: currentUSer._id,
      username: currentUSer.username,
      email: currentUSer.email,
      token: generateToken(currentUSer._id),
    };

    const token = jwt.sign({ data: payload }, secret, {
      expiresIn: expiration,
    });

    res.status(200).json({ token });
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
  login,
};
