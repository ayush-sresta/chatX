import { Router } from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.js";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/logout", logout)
userRouter.post("/update-profile", protectRoute, updateProfile);
