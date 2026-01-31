"use client";

import { useUsersForSidebar } from "@/hooks/getUsersforSidebar";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { ChatUser, setSelectedUser } from "@/store/slices/chatSlice";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";

const Chatlist = () => {
  useUsersForSidebar();
  const dispatch = useDispatch();
  const { users, selectedUser } = useSelector((state: RootState) => state.chat);
  const router = useRouter();

  const handleClick = (user: ChatUser) => {
    dispatch(setSelectedUser(user));
    router.push(`/inbox/${user._id}`);
  };

  return (
    <div className="w-96 border-r border-r-border">
      <h1 className="font-bold text-lg mb-2 py-1 px-2">ayushh_sresta</h1>
      <div className="mb-10 py-1 px-2">
        <Input placeholder="Search" />
      </div>

      <div>
        <h1 className="font-bold mb-2 py-1 px-2">Messages</h1>
        <div className="flex flex-col gap-1">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleClick(user)}
              className={`flex items-center gap-2 cursor-pointer py-3 px-2 ${
                selectedUser?._id === user._id ? "bg-muted" : "hover:bg-muted"
              }`}
            >
              <Avatar size="xl">
                <AvatarFallback>
                  {user.fullname?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span>{user.fullname || user._id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
