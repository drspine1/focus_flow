"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Plus, Trophy } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import MobileNav from "@/components/layout/MobileNav";
import CreateTaskModal from "@/components/CreateTaskModal";
import { ArchiveDrawer } from "@/components/ArchiveDrawer";
import { Task } from "@/types";

// Create a context for task management
const TaskContext = createContext<{
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
} | null>(null);

// Hook to use the task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const isMounted = useRef(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    isMounted.current = true;
    const saved = localStorage.getItem("focusflow_tasks");
    if (saved) {
      try {
        const parsed: Task[] = JSON.parse(saved);
        const now = Date.now();
        const filtered = parsed.filter(t => (t as any).createdAt ? now - (t as any).createdAt < 86400000 : true);
        setTasks(filtered);
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change (only after mount)
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("focusflow_tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const completedTasks = tasks.filter(t => t.isCompleted);

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? {...t, isCompleted: true} : t));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      onCompleteTask: handleCompleteTask,
      onDeleteTask: handleDeleteTask,
    }}>
      <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="h-14 md:h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center px-3 md:px-8 justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 md:gap-4">
            <MobileNav />
            
            <h2 className="font-semibold text-slate-800 text-base md:text-lg hidden sm:block">
              My Workspace
            </h2>
          </div>

          <div className="flex items-center gap-1 md:gap-3">
            <button onClick={() => setIsArchiveOpen(true)} className="relative p-2 md:p-2.5 bg-slate-50 rounded-xl hover:bg-orange-50 transition-all">
              <Trophy size={20} className="md:w-[22px] md:h-[22px] text-slate-500" />
              {completedTasks.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 bg-orange-600 text-white text-[8px] md:text-[10px] rounded-full flex items-center justify-center font-black border-2 border-white">
                  {completedTasks.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-bold flex items-center gap-1.5 md:gap-2 hover:bg-gray-800 transition-colors text-sm"
            >
              <Plus size={14} className="md:w-4 md:h-4" /> 
              <span className="hidden md:inline text-sm">Create Task</span>
            </button>
          </div>
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>

        {isModalOpen && (
          <CreateTaskModal 
            onClose={() => setIsModalOpen(false)} 
            onAdd={(task) => setTasks([task, ...tasks])} 
          />
        )}
      </div>

      <ArchiveDrawer 
        isOpen={isArchiveOpen} 
        onClose={() => setIsArchiveOpen(false)} 
        tasks={completedTasks}
        onDelete={handleDeleteTask}
      />
    </div>
    </TaskContext.Provider>
  );
}