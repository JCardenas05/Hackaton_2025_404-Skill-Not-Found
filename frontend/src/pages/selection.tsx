import { Link } from "react-router-dom";
import { MessageCircle, LayoutDashboard, ScrollText } from "lucide-react";

export function Selection() {
  const items = [
    { label: "Chat", to: "/chat", icon: MessageCircle },
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Registros", to: "/records", icon: ScrollText },
  ];

  return (
    <div className="flex flex-col gap-y-2 min-h-screen items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
      <h1 className="text-3xl font-bold text-center mb-8">
        Bienvenido Admin de <span className="text-orange-500">Inge Lean</span>{" "}
        Chat Bot
      </h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {items.map(({ label, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="
              group
              relative
              flex
              h-36
              w-36
              flex-col
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-black/5
              text-lg
              font-semibold
              tracking-wider
              text-slate-800
              shadow-lg
              shadow-black/30
              backdrop-blur-md
              transition-all
              duration-300
              hover:scale-105
              hover:bg-white/10
              hover:shadow-[0_0_25px_theme(colors.ring)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
              focus-visible:ring-offset-slate-950
            "
          >
            <Icon className="h-10 w-10" />
            <span>{label}</span>

            <span
              className="
                absolute
                inset-0
                rounded-2xl
                bg-gradient-to-b
                from-white/0
                to-white/5
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
