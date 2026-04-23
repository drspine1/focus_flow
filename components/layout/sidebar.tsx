"use client";

import { 
  LayoutDashboard, 
  BarChart3, 
  CheckCircle2, 
  Home, 
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/stats" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white h-screen sticky top-0">
      {/* Brand Logo Section */}
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-2xl text-blue-600">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <CheckCircle2 className="text-white w-5 h-5" />
          </div>
          <span>FocusFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {/* Back to Home Button - Distinct Styling */}
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all group mb-6"
        >
          <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to Home</span>
        </Link>

        <div className="pb-2">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Menu
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${
                  isActive 
                    ? "bg-blue-50 text-blue-600 shadow-sm" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform ${!isActive && "group-hover:scale-110"}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Energy Status Card */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Current Energy</p>
          <div className="mt-2 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-orange-400 w-[70%] rounded-full shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
          </div>
          <p className="mt-2 text-xs text-slate-600 font-medium italic">"High Productivity Window"</p>
        </div>
      </div>
    </aside>
  );
}