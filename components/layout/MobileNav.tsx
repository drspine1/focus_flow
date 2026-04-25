"use client";

import { useState } from "react";
import { Menu, X, CheckCircle2, Home, LayoutDashboard, BarChart3 } from "lucide-react";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { icon: Home, label: "Back Home", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/stats" },
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu}
        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Slide-out Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-slate-900 z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header inside the mobile menu */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <CheckCircle2 className="text-white w-5 h-5" />
            </div>
            <span>FocusFlow</span>
          </div>
          <button 
            onClick={toggleMenu} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Navigation links with solid background */}
        <nav className="p-4 space-y-2 bg-white dark:bg-slate-900 h-[100vh] z-50">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={toggleMenu}
              className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
            <DarkModeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
