"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";

// Import our new components
import MomentumBar from "@/components/MomentumBar";
import { TaskCard } from "@/components/TaskCard";
import { useTasks } from "./layout";

const levels = [
  { id: 'all', label: 'All', color: 'bg-white text-black ring-1 ring-slate-200' },
  { id: 'low', label: 'Low Energy', color: 'bg-green-100 text-green-700' },
  { id: 'mid', label: 'Medium', color: 'bg-blue-100 text-blue-700' },
  { id: 'high', label: 'High Power', color: 'bg-orange-100 text-orange-700' },
];

export default function Dashboard() {
  const [active, setActive] = useState<string>('all');
  const { tasks, onCompleteTask, onDeleteTask } = useTasks();

  const completedTasks = tasks.filter(t => t.isCompleted);
  const activeTasks = tasks.filter(t => !t.isCompleted);
  const progress = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  const filteredTasks = activeTasks.filter(t => active === 'all' || t.energy === active);

  return (
    <div className="min-h-screen text-slate-900 pb-10 font-sans bg-[#FAFAFA] relative overflow-x-hidden">
      
      <header className="px-3 py-4 md:px-12 md:py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center mb-6 md:mb-8">
          <div>
            <h1 className="text-lg md:text-3xl font-black uppercase">Welcome back!</h1>
            <p className="text-black/70 font-medium text-xs md:text-sm">Plan. Execute. Archive.</p> 
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
        <MomentumBar progress={progress} completedCount={completedTasks.length} totalCount={tasks.length} />

        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onComplete={onCompleteTask}
                onDelete={onDeleteTask}
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

// Small helper component for the empty screen
const EmptyState = ({ totalTasks }: { totalTasks: number }) => (
  <div className="flex flex-col items-center justify-center py-16 md:py-24 bg-white rounded-[32px] md:rounded-[40px] border-2 border-dashed border-slate-100 mx-4 md:mx-0">
    <Inbox className="text-slate-400 mb-4 w-8 h-8 md:w-10 md:h-10" />
    <h3 className="text-lg md:text-xl font-bold text-black/80 text-center px-4">{totalTasks > 0 ? "You're all caught up!" : "No! tasks yet "}</h3>
    <p className="text-slate-500 text-xs md:text-sm max-w-[240px] text-center mt-2 px-4">
      {totalTasks > 0 ? "Check your Trophy for wins!" : "Add a task to start your daily momentum."}
    </p>
  </div>
);