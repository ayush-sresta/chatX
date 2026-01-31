import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { io, userSocketMap } from "../server.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password",
    );

    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });

      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    return res.json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: userId },
      ],
    });

    await Message.updateMany(
      { senderId: selectedUserId, receiverId: userId },
      { seen: true },
    );

    return res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};


export const markMessagesAsSeen = async (req, res) => {
  try {
    const currentUserId = req.user._id; // logged-in user
    const senderId = req.params.id; // the other user

    // Update all unseen messages from sender to current user
    await Message.updateMany(
      { senderId, receiverId: currentUserId, seen: false },
      { seen: true },
    );

    return res.json({ success: true, message: "Messages marked as seen" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // Emit the new message to the receiver's socket
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.json({ success: true, newMessage });
  } catch (error) {
    console.log(error);
  }
};
