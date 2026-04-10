"use client";

import React, { useState, FC } from 'react';
import { X } from "lucide-react";
import { Task } from "@/types";

interface CreateTaskModalProps {
  onClose: () => void;
  onAdd: (task: Task) => void;
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({ onClose, onAdd }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newEnergy, setNewEnergy] = useState<"low" | "mid" | "high">("mid");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTitle,
      energy: newEnergy,
      category: "General", // You can add a category state later!
      time: timeString,
      isCompleted: false,
      // @ts-ignore - added for the 24h persistence logic
      createdAt: Date.now(),
    };

    onAdd(newTask);
    setNewTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[32px] p-6 md:p-8 shadow-2xl animate-in slide-in-from-bottom-10">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight text-black">
            Create Task
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 block mb-2">
              Task Title
            </label>
            <input 
              autoFocus
              type="text" 
              placeholder="What's the goal?"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold text-black focus:ring-2 focus:ring-black outline-none transition-all"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          {/* Energy Level Selector */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 block mb-3">
              Energy Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'mid', 'high'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setNewEnergy(lvl)}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    newEnergy === lvl 
                      ? 'bg-black text-white shadow-lg shadow-black/20 scale-[1.02]' 
                      : 'bg-slate-50 text-black/40 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-sm hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            Confirm Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;