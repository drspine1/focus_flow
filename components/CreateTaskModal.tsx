"use client";

import React, { useState, FC } from 'react';
import { X, Plus, Trash2, Sparkles, Loader2 } from "lucide-react";
import { Task, SubTask } from "@/types";

interface CreateTaskModalProps {
  onClose: () => void;
  onAdd: (task: Task) => void;
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({ onClose, onAdd }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newEnergy, setNewEnergy] = useState<"low" | "mid" | "high">("mid");
  const [subtaskList, setSubtaskList] = useState<{ title: string; energy?: "low" | "mid" | "high" }[]>([]);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState("");

  const addSubtask = () => {
    if (!subtaskInput.trim()) return;
    setSubtaskList([...subtaskList, { title: subtaskInput.trim() }]);
    setSubtaskInput("");
  };

  const generateSubtasks = async () => {
    if (!newTitle.trim()) return;
    setIsGenerating(true);
    setAiError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: newTitle }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAiError(data.error || "Something went wrong. Try again!");
        return;
      }

      if (data.subtasks && Array.isArray(data.subtasks)) {
        setSubtaskList(data.subtasks.map((st: any) => ({ title: st.title, energy: st.energy })));
        
        // Auto-set energy level based on most common energy across subtasks
        const energyLevels = data.subtasks.map((st: any) => st.energy);
        const energyCounts = energyLevels.reduce((acc: any, level: string) => {
          acc[level] = (acc[level] || 0) + 1;
          return acc;
        }, {});
        const mostCommonEnergy = Object.keys(energyCounts).reduce((a, b) => 
          energyCounts[a] > energyCounts[b] ? a : b
        ) as "low" | "mid" | "high";
        
        setNewEnergy(mostCommonEnergy);
      } else {
        setAiError("Couldn't generate steps. Try again!");
      }
    } catch {
      setAiError("Failed to connect. Try again!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const finalSubtasks: SubTask[] = subtaskList.map(st => ({
      id: crypto.randomUUID(),
      title: st.title,
      energy: st.energy,
      isCompleted: false
    }));

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTitle,
      energy: newEnergy,
      category: "General",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCompleted: false,
      createdAt: Date.now(),
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
          <button onClick={onClose} className="p-2 bg-slate-100 text-slate-600 rounded-full"><X size={20} /></button>
        </div>

        <form onSubmit={handleConfirm} className="space-y-6">
          {/* GOAL INPUT */}
          <div>
            <label className="text-[10px] font-black uppercase text-black/60 block mb-2 tracking-widest">Goal</label>
            <input 
              autoFocus
              className="w-full bg-slate-50 border text-base text-black/70 placeholder:text-slate-500 border-slate-200 rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-black"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What are we doing today..?"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-black/60 block mb-3 tracking-widest">Energy Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'mid', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setNewEnergy(level)}
                  className={`py-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 capitalize font-bold text-xs ${
                    newEnergy === level 
                      ? "border-black bg-black text-white" 
                      : "border-slate-100 bg-slate-50 text-black/80 hover:border-slate-200"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* SUBTASK INPUT */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-black uppercase text-black/60 tracking-widest">Breakdown (Optional)</label>
              {/* MAGIC WAND BUTTON */}
              <button
                type="button"
                onClick={generateSubtasks}
                disabled={isGenerating || !newTitle.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500 to-blue-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full disabled:opacity-40 hover:opacity-90 transition-all active:scale-95"
              >
                {isGenerating 
                  ? <><Loader2 size={11} className="animate-spin" /> Generating...</>
                  : <><Sparkles size={11} /> AI Generate</>
                }
              </button>
            </div>

            {/* AI ERROR */}
            {aiError && (
              <p className="text-[11px] text-red-500 font-medium mb-2">{aiError}</p>
            )}

            <div className="flex gap-2">
              <input 
                className="flex-1 bg-slate-50 border border-slate-100 placeholder:text-slate-500 text-black/70 rounded-xl p-3 text-sm outline-none"
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                placeholder="Step 1, Step 2..."
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
              />
              <button type="button" onClick={addSubtask} className="p-3 bg-black text-white rounded-xl hover:bg-slate-800"><Plus size={20} /></button>
            </div>
            
            <div className="mt-4 space-y-2">
              {/* SKELETON LOADER */}
              {isGenerating && Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                  <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" style={{ animationDelay: `${i * 0.1}s` }} />
                  <div className="ml-3 w-8 h-5 rounded-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" style={{ animationDelay: `${i * 0.1}s` }} />
                </div>
              ))}

              {/* REAL SUBTASKS */}
              {!isGenerating && subtaskList.map((st, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-600">{st.title}</span>
                  <div className="flex items-center gap-2">
                    {st.energy && (
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter ${
                        st.energy === 'high' ? 'bg-orange-100 text-orange-600' :
                        st.energy === 'mid'  ? 'bg-blue-100 text-blue-600' :
                                               'bg-green-100 text-green-600'
                      }`}>
                        {st.energy}
                      </span>
                    )}
                    <button type="button" onClick={() => setSubtaskList(subtaskList.filter((_, idx) => idx !== i))}>
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full text-sm bg-black text-white py-4 rounded-2xl font-black uppercase shadow-lg shadow-black/10 active:scale-95 transition-all">
            Start Momentum
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;