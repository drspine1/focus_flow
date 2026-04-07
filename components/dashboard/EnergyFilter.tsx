"use client";
import { Zap } from "lucide-react";
import { useState } from "react";

const levels = [
  { id: 'low', label: 'Low Energy', color: 'bg-green-100 text-green-700' },
  { id: 'mid', label: 'Medium', color: 'bg-blue-100 text-blue-700' }, // The "Mid" card you were missing
  { id: 'high', label: 'High Power', color: 'bg-orange-100 text-orange-700' },
];

export default function EnergyFilter() {
  const [active, setActive] = useState('mid');

  return (
    <div className="flex gap-2 p-1 bg-slate-100 rounded-lg w-fit border border-slate-200">
      {levels.map((level) => (
        <button
          key={level.id}
          onClick={() => setActive(level.id)}
          className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all duration-200 ${
            active === level.id 
              ? `${level.color} shadow-sm scale-105 ring-1 ring-white/50` 
              : 'text-black/60 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}