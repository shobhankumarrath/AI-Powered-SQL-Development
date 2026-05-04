import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <header className="h-16 border-b px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </header>
  );
}
