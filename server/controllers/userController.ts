import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User.js";

const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );
};

/* ======================
   LOGIN USER
====================== */
export const authUser = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email }) as IUser | null;

    if (user && await user.matchPassword(password)) {

      res.json({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id.toString())
      });

    } else {

      res.status(401).json({
        message: "Invalid email or password"
      });

    }

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


/* ======================
   REGISTER USER
====================== */
export const registerUser = async (req: Request, res: Response) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

      res.status(400).json({
        message: "Please fill all fields"
      });

      return;

    }

    const userExists = await User.findOne({ email });

    if (userExists) {

      res.status(400).json({
        message: "User already exists"
      });

      return;

    }

    const user = await User.create({
      name,
      email,
      password
    }) as IUser;

    res.status(201).json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id.toString())
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};