"use client";

import React, { useState } from 'react';
import { Trash2, Circle, ChevronDown, CheckCircle2 } from "lucide-react";
import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

export const TaskCard = ({ task, onComplete, onDelete, onToggleSubtask }: TaskCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Logic to show/hide breakdown
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  return (
    <div className="bg-white p-6 rounded-[24px] border border-slate-200/60 shadow-sm hover:border-black/20 transition-all flex flex-col group relative">
      <button 
  onClick={() => onDelete(task.id)}
  className="absolute top-4 right-4 p-2 text-red-500 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
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
          <button onClick={() => onComplete(task.id)} className="mr-8 text-blue-600 md:text-slate-300 hover:text-blue-600 transition-all hover:scale-110 active:scale-95">
            <Circle size={24} />
          </button>
        </div>
        <h3 className="text-lg font-bold leading-tight mb-1 text-black/90 tracking-tight">{task.title}</h3>
        <p className="text-black/40 text-[10px] font-bold uppercase tracking-widest">{task.category}</p>
      </div>
      
      {/* DAY 6: CONDITIONAL SUBTASK RENDER */}
      {hasSubtasks && (
        <div className="mt-4 pt-4 border-t border-slate-50">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full group/btn"
          >
            <span className="text-xs font-bold text-slate-500 group-hover/btn:text-black transition-colors">
              {isExpanded ? "Hide Breakdown" : `View Breakdown (${task.subtasks.length})`}
            </span>
            <ChevronDown size={16} className={`text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded && (
            <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-1">
              {task.subtasks.map((sub) => (
                <div 
                  key={sub.id} 
                  onClick={() => onToggleSubtask(task.id, sub.id)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-100 transition-colors cursor-pointer"
                >
                  {sub.isCompleted ? <CheckCircle2 size={14} className="text-green-500" /> : <Circle size={14} className="text-slate-400" />}
                  <span className={` font-medium ${sub.isCompleted ? 'text-slate-400 line-through text-xs' : 'text-sm text-slate-800 '}`}>
                    {sub.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};