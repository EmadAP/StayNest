import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { SECRET } from "../util/config";

const router = Router();
const salt = bcrypt.genSaltSync(10);

interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface JwtPayload {
  username: string;
  email: string;
  id: string;
}

router.post(
  "/signup",
  async (req: Request<{}, {}, SignupRequest>, res: Response) => {
    const { username, password, email } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, salt);
      const userDoc = await User.create({
        username,
        password: hashedPassword,
        email,
      });
      res.status(201).json({ id: userDoc._id, username: userDoc.username });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Signup failed", error: err });
    }
  }
);

router.post(
  "/login",
  async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    const { username, password } = req.body;
    try {
      const userDoc = await User.findOne({ username });
      if (!userDoc) {
        res.status(400).json({ message: "Wrong credentials" });
        return;
      }
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (!passOk) {
        res.status(400).json({ message: "Wrong credentials" });
        return;
      }

      jwt.sign({ username, id: userDoc._id }, SECRET, {}, (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            // httpOnly: true,
            sameSite: "lax",
            secure: false,
          })
          .json({ id: userDoc._id, username });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Login failed", error: err });
    }
  }
);

router.get("/profile", async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token" });
    return;
  }
  jwt.verify(token, SECRET, {}, async (err, decoded) => {
    if (err || !decoded) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
      return;
    }

    const { id } = decoded as JwtPayload;

    try {
      const user = await User.findById(id).select("username email _id");
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
});

router.post("/logout", (req: Request, res: Response) => {
  res
    .clearCookie("token", {
      // httpOnly: true,
      sameSite: "lax",
      secure: false,
    })
    .json({ message: "Logged out successfully" });
});

export default router;
