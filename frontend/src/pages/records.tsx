import { MessageCircle, LayoutDashboard, ScrollText } from "lucide-react";

export function Records() {
  const items = [
    { label: "Chat", to: "/chat", icon: MessageCircle },
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Registros", to: "/records", icon: ScrollText },
  ];

  return (
    <div className="flex flex-col gap-y-2 min-h-screen items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
      Hola
    </div>
  );
}
