import { Router } from "express";
import { protectRoute } from "../middlewares/auth.js";
import {
  getMessages,
  getUsersForSidebar,
  markMessagesAsSeen,
  sendMessage,
} from "../controllers/message.controller.js";

export const messageRouter = Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/:id", protectRoute, markMessagesAsSeen);
messageRouter.post("/:id", protectRoute, sendMessage);