import Chatlist from "@/components/Chatlist";

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1">
      <Chatlist />
      {children}
    </div>
  );
}
