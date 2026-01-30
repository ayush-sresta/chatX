import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
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

    return res.json({ success: true, filteredUsers, unseenMessages });
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (req, res) => {
    try {
        const {id: selectedUserId0 = }
    } catch (error) {
     console.log(error)   
    }
}