import { MessageCircle, LayoutDashboard, ScrollText } from "lucide-react";

export function Records() {
  const items = [
    { label: "Chat", to: "/chat", icon: MessageCircle },
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Registros", to: "/records", icon: ScrollText },
  ];

  return (
    <div className="flex flex-col gap-y-2 min-h-screen items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.to}
          className="flex items-center gap-x-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <item.icon className="h-5 w-5" />
          <span className="text-sm font-medium">{item.label}</span>
        </a>
      ))}
    </div>
  );
}
