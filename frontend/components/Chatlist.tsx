"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";

const Chatlist = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const router = useRouter();

  const chatId = "jholmomo_favourite";
  const isSelected = selectedChatId === chatId;

  const handleClick = (id: string) => {
    setSelectedChatId(id);
    router.push(`/inbox/${id}`); // Navigate to dynamic chat page
  };

  return (
    <div className="w-96 border-r border-r-border">
      <h1 className="font-bold text-lg mb-2 py-1 px-2">ayushh_sresta</h1>
      <div className="mb-10 py-1 px-2">
        <Input type="text" placeholder="Search" />
      </div>
      <div>
        <h1 className="font-bold mb-2 py-1 px-2">Messages</h1>
        <div>
          <div
            onClick={() => handleClick(chatId)}
            className={`flex items-center gap-2 cursor-pointer py-3 px-2 ${
              isSelected ? "bg-muted" : "hover:bg-muted"
            }`}
          >
            <Avatar size="xl">
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{chatId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
