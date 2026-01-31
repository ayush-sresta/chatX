import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatUser {
  _id: string;
  fullname?: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  seen?: boolean;
  createdAt?: string;
}

interface ChatState {
  users: ChatUser[];
  selectedUser?: ChatUser;
  messages: Message[];
  onlineUsers: string[];
}

const initialState: ChatState = {
  users: [],
  selectedUser: undefined,
  messages: [],
  onlineUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUsersForSidebar: (state, action: PayloadAction<ChatUser[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<ChatUser>) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      // Merge messages without duplicates
      const map = new Map(state.messages.map((m) => [m._id, m]));
      action.payload.forEach((m) => map.set(m._id, m));
      state.messages = Array.from(map.values()).sort(
        (a, b) =>
          new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime(),
      );
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      if (!state.messages.find((m) => m._id === action.payload._id)) {
        state.messages.push(action.payload);
      }
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  setUsersForSidebar,
  setSelectedUser,
  setMessages,
  addMessage,
  setOnlineUsers,
} = chatSlice.actions;
export default chatSlice.reducer;
