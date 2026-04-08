"use client";

import { useState } from "react";
import {  Plus, Clock, ChevronRight } from "lucide-react";

import { Task } from "@/types";


const MOCK_TASKS: Task[] = [
  { id: "1", title: "Architect Database Schema", energy: "high", category: "Backend", time: "2h 30m", isCompleted: false },
  { id: "2", title: "Refactor Navigation Component", energy: "mid", category: "Frontend", time: "45m", isCompleted: false },
  { id: "3", title: "Update Documentation", energy: "low", category: "Admin", time: "20m", isCompleted: false },
  { id: "4", title: "Deep Work: API Integration", energy: "high", category: "Fullstack", time: "3h 00m", isCompleted: false },
  { id: "5", title: "Review Pull Requests", energy: "low", category: "DevOps", time: "15m", isCompleted: false },
];

const levels = [
  { id: 'all', label: 'All', color: 'bg-white text-black ring-1 ring-slate-200' },
  { id: 'low', label: 'Low Energy', color: 'bg-green-100 text-green-700' },
  { id: 'mid', label: 'Medium', color: 'bg-blue-100 text-blue-700' },
  { id: 'high', label: 'High Power', color: 'bg-orange-100 text-orange-700' },
];

export default function Dashboard() {
  const [active, setActive] = useState<string>('all');

  const filteredTasks = MOCK_TASKS.filter((task) => 
    active === 'all' ? true : task.energy === active
  );

  const getStatusMessage = () => {
    const count = filteredTasks.length;
    const levelLabel = levels.find(l => l.id === active)?.label || "selected";
    if (active === 'all') return `Showing all ${count} tasks for today.`;
    return `You have ${count} ${count === 1 ? 'task' : 'tasks'} for ${levelLabel.toLowerCase()}.`;
  };

  return (
    <div className="min-h-screen text-slate-900 pb-10 font-sans">
      
      {/* HEADER SECTION */}
      <header className="px-4 py-6 md:px-12 md:py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Row: Welcome & Action */}
          <div className="flex flex-row justify-between items-center mb-2">
            <h1 className="text-xl md:text-3xl font-black tracking-tight text-black uppercase">
              Welcome back!
            </h1>
            
          
          </div>

          {/* NEW PARAGRAPH */}
          <p className="text-black/70 font-medium text-sm md:text-base mb-8">
            Here's what we're tackling based on your bandwidth today.
          </p>

          {/* FILTER BAR */}
          <div className="flex flex-wrap gap-2 p-1 bg-slate-50 rounded-xl w-full md:w-fit border border-slate-100">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setActive(level.id)}
                className={`flex-1 md:flex-none text-center whitespace-nowrap px-3 md:px-6 py-2 rounded-lg text-[12px] md:text-[13px] font-bold transition-all duration-200 ${
                  active === level.id 
                    ? `${level.color} shadow-sm ring-1 ring-white/50` 
                    : 'text-black/60 hover:text-slate-700'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto  py-6 md:px-12 md:py-8">
        
        {/* Dynamic Status Message */}
        <div className="mb-6">
          <p className="text-black/60 font-bold text-sm md:text-base border-l-4 border-blue-500 pl-3">
            {getStatusMessage()}
          </p>
        </div>

        {/* TASK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-white p-5 md:p-6 rounded-[24px] border border-slate-200/60 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between w-full"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
                    task.energy === 'high' ? 'bg-orange-100 text-orange-700' : 
                    task.energy === 'mid' ? 'bg-blue-100 text-blue-700' : 
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.energy === 'high' ? 'High Power' : task.energy === 'mid' ? 'Medium' : 'Low Energy'}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock size={12} />
                    <span className="text-[10px] font-bold">{task.time}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold leading-tight mb-1 text-black/90">
                  {task.title}
                </h3>
                <p className="text-black/60 text-[10px] font-bold uppercase tracking-[0.1em]">
                  {task.category}
                </p>
              </div>

              <button className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between group cursor-pointer">
                <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                  View Breakdown
                </span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-[32px] border-2 border-dashed border-slate-100 mt-4 px-4">
            <p className="text-slate-400 font-bold italic text-sm">No tasks currently in this energy zone.</p>
          </div>
        )}
      </main>
    </div>
  );
}