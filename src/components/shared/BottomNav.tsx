"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, User, Calendar, BarChart3, Settings } from "lucide-react";

const NAV_ITEMS = [
  { href: "/today", icon: Sparkles, label: "Today" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/timeline", icon: Calendar, label: "Timeline" },
  { href: "/insights", icon: BarChart3, label: "Insights" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong safe-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                active ? "text-aurora-400" : "text-white/30 hover:text-white/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
              {active && (
                <div className="w-1 h-1 rounded-full bg-aurora-400 absolute -bottom-0" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
