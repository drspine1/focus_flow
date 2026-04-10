// components/ArchiveDrawer.tsx
import React from 'react';
import { Trophy, X, CheckCircle2, Trash2, Inbox } from "lucide-react";
import { Task } from "@/types";

interface ArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onDelete: (id: string) => void;
}

export const ArchiveDrawer = ({ isOpen, onClose, tasks, onDelete }: ArchiveDrawerProps) => (
  <>
    <div className={`fixed inset-y-0 right-0 w-full md:w-85 bg-white shadow-2xl z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-l border-slate-100 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 md:p-8 h-full flex flex-col">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-slate-900">
              <Trophy className="text-orange-500" size={24} /> Today's Wins
            </h2>
            <p className="text-slate-600 text-xs font-bold mt-1">Completed in the last 24h</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {tasks.length > 0 ? tasks.map(task => (
            <div key={task.id} className="p-5 md:bg-slate-50 bg-slate-200 rounded-[24px] border border-slate-100 flex items-start gap-4 group">
              <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle2 size={18} /></div>
              <div className="flex-1">
                <p className="font-bold text-sm text-slate-800 line-through decoration-slate-300">{task.title}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.energy} Power</span>
                  <button onClick={() => onDelete(task.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center h-64 opacity-30">
              <Inbox size={48} className="mb-4 text-black" />
              <p className="text-sm font-bold text-black">No wins recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] animate-in fade-in duration-300" />}
  </>
);