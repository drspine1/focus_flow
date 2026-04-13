"use client";

import React, { useState, FC } from 'react';
import { X, Plus, Trash2, Zap } from "lucide-react"; // Added Zap icon
import { Task, SubTask } from "@/types";

interface CreateTaskModalProps {
  onClose: () => void;
  onAdd: (task: Task) => void;
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({ onClose, onAdd }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newEnergy, setNewEnergy] = useState<"low" | "mid" | "high">("mid"); // Energy state
  const [subtaskList, setSubtaskList] = useState<string[]>([]);
  const [subtaskInput, setSubtaskInput] = useState("");

  const addSubtask = () => {
    if (!subtaskInput.trim()) return;
    setSubtaskList([...subtaskList, subtaskInput.trim()]);
    setSubtaskInput("");
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const finalSubtasks: SubTask[] = subtaskList.map(st => ({
      id: crypto.randomUUID(),
      title: st,
      isCompleted: false
    }));

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTitle,
      energy: newEnergy, // Uses the selected energy
      category: "General",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCompleted: false,
      createdAt: Date.now(), // Essential for "Newest First" sorting
      subtasks: finalSubtasks
    };

    onAdd(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[32px] p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black uppercase text-black">Create Task</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full"><X size={20} /></button>
        </div>

        <form onSubmit={handleConfirm} className="space-y-6">
          {/* GOAL INPUT */}
          <div>
            <label className="text-[10px] font-black uppercase text-black/40 block mb-2 tracking-widest">Goal</label>
            <input 
              autoFocus
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-black"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What are we doing?"
            />
          </div>

          {/* ENERGY LEVEL SELECTION - DAY 7 REQUIREMENT */}
          <div>
            <label className="text-[10px] font-black uppercase text-black/40 block mb-3 tracking-widest">Energy Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'mid', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setNewEnergy(level)}
                  className={`py-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 capitalize font-bold text-xs ${
                    newEnergy === level 
                      ? "border-black bg-black text-white" 
                      : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                  }`}
                >
                 
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* SUBTASK INPUT */}
          <div>
            <label className="text-[10px] font-black uppercase text-black/40 block mb-2 tracking-widest">Breakdown (Optional)</label>
            <div className="flex gap-2">
              <input 
                className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm outline-none"
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                placeholder="Step 1, Step 2..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
              />
              <button type="button" onClick={addSubtask} className="p-3 bg-black text-white rounded-xl hover:bg-slate-800"><Plus size={20} /></button>
            </div>
            
            <div className="mt-4 space-y-2">
              {subtaskList.map((st, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-600">{st}</span>
                  <button type="button" onClick={() => setSubtaskList(subtaskList.filter((_, idx) => idx !== i))}>
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-black/10 active:scale-95 transition-all">
            Start Momentum
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;