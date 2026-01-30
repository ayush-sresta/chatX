"use client";

import { IconBrandTelegram } from "@tabler/icons-react";

const ChatDefaultPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 p-6">
        <div className="border-2 border-gray-400 rounded-full p-10 flex justify-center items-center bg-white shadow-md">
          <IconBrandTelegram size={50} stroke={1.5} />
        </div>
        <h1 className="text-2xl font-semibold text-gray-700">Your Messages</h1>
        <p className="text-gray-500 text-center">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  );
};

export default ChatDefaultPage;
