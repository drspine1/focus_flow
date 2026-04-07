import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 border-t border-white/5 py-12 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* Brand & Small Description */}
          <div className="flex flex-col gap-3 max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-400">
              <CheckCircle2 className="w-6 h-6" /> FocusFlow
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              An intelligent productivity workspace designed to help developers align their deep work with their natural energy cycles.
            </p>
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">
              © {currentYear} FocusFlow. All rights reserved.
            </p>
          </div>

          {/* Organizer & Challenge Credit */}
          <div className="flex flex-col gap-2">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-blue-400 text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">
                Project Milestone
              </p>
              <p className="text-white text-sm font-medium">
                This project is a product of the <span className="text-blue-400">#Eng30DayChallenge</span>
              </p>
              <p className="text-slate-500 text-[11px] mt-2">
                Powered by <span className="text-slate-300 font-bold">THE ENGINEER NETWORK</span>
              </p>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-blue-400 transition-all">Home</Link>
            <Link href="/dashboard" className="hover:text-blue-400 transition-all">App</Link>
            <Link href="/learn-more" className="hover:text-blue-400 transition-all">About</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}