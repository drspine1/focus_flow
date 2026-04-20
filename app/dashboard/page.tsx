"use client";

import { useState } from "react";
import { Inbox, ArrowUpDown, Zap } from "lucide-react";

// Components
import { TaskCard } from "@/components/TaskCard";
import MomentumBar from "@/components/MomentumBar"; 
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
      if (sortBy === 'newest') return ((b as any).createdAt || 0) - ((a as any).createdAt || 0);
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
    <div className="min-h-screen text-slate-900 pb-10 font-sans bg-[#FAFAFA]">
      
      <header className="px-3 py-4 md:px-12 md:py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight">welcome back!</h1>
            <p className="text-slate-700 font-medium text-xs md:text-sm">Plan. Execute. Archive.</p> 
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <ArrowUpDown size={14} className="text-slate-500" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'energy')}
              className="bg-transparent text-sm font-bold outline-none cursor-pointer text-slate-700"
            >
              <option value="newest">Newest First</option>
              <option value="energy">Highest Energy</option>
            </select>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-1 md:gap-2 p-1 bg-slate-100 rounded-xl w-fit border border-slate-100 overflow-x-auto">
          {levels.map((l) => (
            <button key={l.id} onClick={() => setActive(l.id)} className={`px-4 md:px-6 py-2 rounded-lg text-xs font-bold transition-all ${active === l.id ? l.color : 'text-slate-700 hover:text-slate-600'}`}>
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-12">
        
        {/* FULL WIDTH MOMENTUM SECTION */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-center hover:border-blue-100 transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Zap className="text-blue-600" size={18} />
              </div>
              <h3 className="font-bold uppercase text-[16px] tracking-[0.2em] text-slate-700">Daily Momentum</h3>
            </div>
            
            <MomentumBar 
              progress={progress} 
              completedCount={completedTasks.length} 
              totalCount={tasks.length} 
            />
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {filteredAndSortedTasks.length > 0 ? (
            filteredAndSortedTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onComplete={onCompleteTask}
                onDelete={onDeleteTask}
                onToggleSubtask={handleToggleSubtask}
              />
            ))
          ) : (
            <div className="col-span-full lg:col-span-2">
              <EmptyState totalTasks={tasks.length} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const EmptyState = ({ totalTasks }: { totalTasks: number }) => (
  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-100 w-full">
    <Inbox className="text-slate-400 mb-4" size={48} />
    <h3 className="text-lg font-bold text-slate-600 text-center">
      {totalTasks > 0 ? "Daily missions cleared!" : (
        <>
          <p className="text-black">No tasks yet</p>
          <p className="text-black/70 text-sm">Add a task to start your daily momentum.</p>
        </>
      )}
    </h3>
  </div>
);