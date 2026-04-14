"use client";

import { useState } from "react";
import { Inbox, ArrowUpDown, Target } from "lucide-react"; // Added Target icon

// Import our components
import MomentumBar from "@/components/MomentumBar";
import { TaskCard } from "@/components/TaskCard";
import EnergyChart from "@/components/EnergyChart";
import CircularProgress from "@/components/CircularProgress"; // Day 9 Component
import { useTasks } from "./layout";

const levels = [
  { id: 'all', label: 'All', color: 'bg-white text-black ring-1 ring-slate-200' },
  { id: 'low', label: 'Low Energy', color: 'bg-green-100 text-green-700' },
  { id: 'mid', label: 'Medium', color: 'bg-blue-100 text-blue-700' },
  { id: 'high', label: 'High Power', color: 'bg-orange-100 text-orange-700' },
];

export default function Dashboard() {
  const [active, setActive] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'energy'>('newest');

  const { tasks, setTasks, onCompleteTask, onDeleteTask } = useTasks();

  const completedTasks = tasks.filter(t => t.isCompleted);
  const activeTasks = tasks.filter(t => !t.isCompleted);
  const progress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  const filteredAndSortedTasks = activeTasks
    .filter(t => active === 'all' || t.energy === active)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        const timeA = (a as any).createdAt || 0;
        const timeB = (b as any).createdAt || 0;
        return timeB - timeA;
      }
      if (sortBy === 'energy') {
        const weights = { high: 3, mid: 2, low: 1 };
        return weights[b.energy as keyof typeof weights] - weights[a.energy as keyof typeof weights];
      }
      return 0;
    });

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prevTasks: any[]) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;
        const updatedSubtasks = task.subtasks.map((sub: any) =>
          sub.id === subtaskId ? { ...sub, isCompleted: !sub.isCompleted } : sub
        );
        const allDone = updatedSubtasks.length > 0 && updatedSubtasks.every((s: any) => s.isCompleted);
        return { 
          ...task, 
          subtasks: updatedSubtasks,
          isCompleted: allDone ? true : task.isCompleted 
        };
      })
    );
  };

  return (
    <div className="min-h-screen text-slate-900 pb-10 font-sans bg-[#FAFAFA] relative overflow-x-hidden">
      
      <header className="px-3 py-4 md:px-12 md:py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-lg md:text-3xl font-black uppercase">Welcome back!</h1>
            <p className="text-black/70 font-medium text-xs md:text-sm">Plan. Execute. Archive.</p> 
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <ArrowUpDown size={14} className="text-slate-400" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'energy')}
              className="bg-transparent text-xs font-bold outline-none cursor-pointer text-slate-600"
            >
              <option value="newest">Newest First</option>
              <option value="energy">Highest Energy</option>
            </select>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-1 md:gap-2 p-1 bg-slate-50 rounded-xl w-fit border border-slate-100 overflow-x-auto">
          {levels.map((l) => (
            <button key={l.id} onClick={() => setActive(l.id)} className={`px-3 md:px-4 lg:px-6 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${active === l.id ? l.color : 'text-black/70'}`}>
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 py-6 md:px-12 md:py-8">
        
        {/* NEW DAY 9 VISUAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 items-stretch">
          
          <div className="lg:col-span-2 space-y-6">
            <MomentumBar progress={progress} completedCount={completedTasks.length} totalCount={tasks.length} />
            
            {/* The "Boss Bar" Circular Section */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 flex flex-col md:flex-row items-center justify-between shadow-sm gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                   <Target className="text-blue-600" size={20} />
                   <h3 className="text-xl font-black uppercase italic tracking-tight">Daily Target</h3>
                </div>
                <p className="text-slate-500 text-sm font-medium max-w-[200px]">
                  You have completed <span className="text-black font-bold">{completedTasks.length}</span> out of <span className="text-black font-bold">{tasks.length}</span> missions today.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-[40px]">
                <CircularProgress progress={progress} size={140} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <EnergyChart tasks={tasks} />
          </div>
        </div>

        {filteredAndSortedTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredAndSortedTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onComplete={onCompleteTask}
                onDelete={onDeleteTask}
                onToggleSubtask={handleToggleSubtask}
              />
            ))}
          </div>
        ) : (
          <EmptyState totalTasks={tasks.length} />
        )}
      </main>
    </div>
  );
}

const EmptyState = ({ totalTasks }: { totalTasks: number }) => (
  <div className="flex flex-col items-center justify-center py-16 md:py-24 bg-white rounded-[32px] md:rounded-[40px] border-2 border-dashed border-slate-100 mx-4 md:mx-0">
    <Inbox className="text-slate-400 mb-4 w-8 h-8 md:w-10 md:h-10" />
    <h3 className="text-lg md:text-xl font-bold text-black/80 text-center px-4">{totalTasks > 0 ? "You're all caught up!" : "No tasks yet"}</h3>
    <p className="text-slate-500 text-xs md:text-sm max-w-[240px] text-center mt-2 px-4">
      {totalTasks > 0 ? "Check your Trophy for wins!" : "Add a task to start your daily momentum."}
    </p>
  </div>
);