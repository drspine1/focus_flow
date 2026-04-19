"use client";
import { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function Assistant() {
  const [input, setInput] = useState("");
  // We now store an array of tasks instead of just a string
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const askAI = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    setError(""); 
    setTasks([]); // Clear previous tasks
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      
      const data = await res.json();

      // Check for the 'subtasks' array we defined in our backend prompt
      if (data.subtasks && Array.isArray(data.subtasks)) {
        setTasks(data.subtasks);
        setInput(""); // Clear input on success
      } else {
        setError("AI didn't return a proper task list. Try again!");
      }
    } catch (err) {
      console.error("Error calling AI:", err);
      setError("Failed to connect to the AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:border-blue-100 transition-all">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-blue-600" size={20} />
        <h3 className="font-bold text-slate-700 uppercase tracking-wider text-sm">AI Planner</h3>
      </div>

      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. Build a landing page..."
        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
      />
      
      <button 
        onClick={askAI}
        disabled={isLoading || !input}
        className="w-full mt-3 bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest disabled:opacity-50 transition-all"
      >
        {isLoading ? "Analyzing Goal..." : "Generate 5 Steps"}
      </button>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
          {error}
        </div>
      )}
      
      {/* TASK LIST DISPLAY */}
      {tasks.length > 0 && (
        <div className="mt-5 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Generated Plan</p>
          {tasks.map((task, index) => (
            <div 
              key={index} 
              className="group flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-blue-200 transition-all"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium text-slate-700">{task.title}</span>
              </div>
              
              {/* ENERGY TAG */}
              <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter ${
                task.energy === 'high' ? 'bg-orange-100 text-orange-600' : 
                task.energy === 'mid' ? 'bg-blue-100 text-blue-600' : 
                'bg-green-100 text-green-600'
              }`}>
                {task.energy}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}