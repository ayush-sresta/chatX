"use client";

import { use } from "react"; // React.use()
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

type ChatPageProps = {
  params: Promise<{ chatId: string }>; // params is now a Promise
};

const ChatPage = ({ params }: { params: Promise<{ chatId: string }> }) => {
  // unwrap the promise
  const { chatId } = use(params);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<{ fromMe: boolean; text: string }[]>(
    [
      { fromMe: false, text: "Hi there!" },
      { fromMe: true, text: "Hello! How are you?" },
      { fromMe: false, text: "I'm good, thanks!" },
    ],
  );

  const sendMessage = () => {
    alert("Message sent")
  }
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50 w-full">
      {/* Top Bar */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-300 bg-white shadow-sm">
        <Avatar size="lg">
          <AvatarFallback>{chatId[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{chatId}</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.fromMe
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex p-4 border-t border-gray-300 gap-2 bg-white">
        <Input
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1"
        />
        <Button onClick={sendMessage} className="px-4">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
