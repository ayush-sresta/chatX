"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { connectSocket } from "@/lib/socket";
import { addMessage, setOnlineUsers } from "@/store/slices/chatSlice";

export default function SocketListener() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user?._id) return;
    const socket = connectSocket(user._id);

    socket.on("getOnlineUsers", (users: string[]) => {
      dispatch(setOnlineUsers(users));
    });

    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("getOnlineUsers");
      socket.off("newMessage");
    };
  }, [user, dispatch]);

  return null;
}
