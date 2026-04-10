// components/TaskCard.tsx
import React from 'react';
import { Trash2, Circle, ChevronRight } from "lucide-react";
import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onComplete, onDelete }: TaskCardProps) => (
  <div className="bg-white p-6 rounded-[24px] border border-slate-200/60 shadow-sm hover:border-black transition-all flex flex-col justify-between group relative">
    <button 
      onClick={() => onDelete(task.id)}
      className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
    >
      <Trash2 size={16} />
    </button>

    <div>
      <div className="flex justify-between items-center mb-4">
        <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${
          task.energy === 'high' ? 'bg-orange-100 text-orange-700' : 
          task.energy === 'mid' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
        }`}>
          {task.energy} Power
        </span>
        <button onClick={() => onComplete(task.id)} className="mr-8 text-slate-200 hover:text-blue-600 transition-all hover:scale-110 active:scale-95">
          <Circle size={24} />
        </button>
      </div>
      <h3 className="text-lg font-bold leading-tight mb-1 text-black/90 tracking-tight">{task.title}</h3>
      <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest">{task.category}</p>
    </div>
    
    <button className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between group/btn">
      <span className="text-xs font-bold text-slate-500 group-hover/btn:text-black transition-colors">View Breakdown</span>
      <ChevronRight size={16} className="text-slate-300 group-hover/btn:text-black transition-transform group-hover/btn:translate-x-1" />
    </button>
  </div>
);