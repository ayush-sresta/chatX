"use client";

import { use } from "react";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { sendMessageToUser } from "@/hooks/sendMessageToUser";
import { addMessage, setMessages } from "@/store/slices/chatSlice";
import { markMessagesSeenForUser } from "@/hooks/markMessageAsSeen";
import axios from "axios";

const ChatPage = ({ params }: { params: Promise<{ chatId: string }> }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { selectedUser, messages: allMessages } = useSelector(
    (state: RootState) => state.chat,
  );

  const { chatId } = use(params);
  const receiverId = selectedUser?._id || chatId;

  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Deduplicate messages for this chat
  const messages = Array.from(
    new Map(
      allMessages
        .filter((m) => m.senderId === receiverId || m.receiverId === receiverId)
        .map((m) => [m._id, m]),
    ).values(),
  );

  // Fetch messages and mark seen
  useEffect(() => {
    const fetchMessages = async () => {
      if (!token || !receiverId) return;

      try {
        const res = await axios.get(
          `http://localhost:8000/api/message/${receiverId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (res.data.success) dispatch(setMessages(res.data.messages));

        await markMessagesSeenForUser(receiverId, token);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };
    fetchMessages();
  }, [receiverId, token, dispatch]);

  const sendMessage = async () => {
    if (!text.trim() || !token) return;

    const newMessage = await sendMessageToUser(receiverId, text, token);
    if (newMessage) {
      dispatch(addMessage(newMessage));
      setText("");
    }
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      <div className="flex items-center gap-4 p-4 border-b border-gray-300 bg-white shadow-sm">
        <Avatar size="lg">
          <AvatarFallback>{receiverId[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">
          {selectedUser?.fullname || chatId}
        </h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${msg.senderId === user?._id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                msg.senderId === user._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text || "📷 Image"}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex p-4 border-t border-gray-300 gap-2 bg-white">
        <Input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default ChatPage;
