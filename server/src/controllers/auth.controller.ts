import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logUserIn, registerUser } from "../models/User";

export const signUpHandler = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    if (user !== null) {
      return res.status(202).json(user);
    }
    res.status(400).json("Email is already registered");
  } catch (err) {
    res.status(400).json(err);
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const user = await logUserIn(req.body.email, req.body.password);
    if (user !== null) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
        },
        "video-calling-app"
      );
      return res.json({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    }

    return res.status(400).json("Wrong email or password!");
  } catch (err: any) {
    res.status(400).json("Wrong email or password!");
  }
};
