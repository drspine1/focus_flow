"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { Plus, Trophy } from "lucide-react";
import Sidebar from "@/components/layout/sidebar";
import MobileNav from "@/components/layout/MobileNav";
import CreateTaskModal from "@/components/CreateTaskModal";
import { ArchiveDrawer } from "@/components/ArchiveDrawer";
import { Task } from "@/types";

const TaskContext = createContext<{
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  archivedTasks: Task[];
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
} | null>(null);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("focusflow_tasks");
      if (saved) setTasks(JSON.parse(saved));
    } catch { /* ignore */ }

    try {
      const saved = localStorage.getItem("focusflow_archive");
      if (saved) setArchivedTasks(JSON.parse(saved));
    } catch { /* ignore */ }

    setMounted(true);
  }, []);

  // Persist tasks on every change — only after initial load
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.removeItem("focusflow_tasks");
      localStorage.setItem("focusflow_tasks", JSON.stringify(tasks));
    } catch (e) {
      console.warn("localStorage quota exceeded, clearing all data...");
      localStorage.removeItem("focusflow_tasks");
      localStorage.removeItem("focusflow_archive");
    }
  }, [tasks, mounted]);

  const handleAddTask = (task: Task) => {
    setTasks(prev => [task, ...prev]);
  };

  const handleCompleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    if (archivedTasks.some(t => t.id === id)) return;
    const newArchive = [...archivedTasks, { ...task, isCompleted: true }];
    setArchivedTasks(newArchive);
    localStorage.setItem("focusflow_archive", JSON.stringify(newArchive));
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    const newArchive = archivedTasks.filter(t => t.id !== id);
    setArchivedTasks(newArchive);
    localStorage.setItem("focusflow_archive", JSON.stringify(newArchive));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      setTasks,
      archivedTasks,
      onCompleteTask: handleCompleteTask,
      onDeleteTask: handleDeleteTask,
    }}>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <header className="h-14 md:h-16 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center px-3 md:px-8 justify-between sticky top-0 z-10">
            <div className="flex items-center gap-2 md:gap-4">
              <MobileNav />
              <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-base md:text-lg hidden sm:block">
                My Workspace
              </h2>
            </div>
            <div className="flex items-center gap-1 md:gap-3">
              <button onClick={() => setIsArchiveOpen(true)} className="relative p-2 md:p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-700 transition-all">
                <Trophy size={20} className="md:w-[22px] md:h-[22px] text-slate-500" />
                {mounted && archivedTasks.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 bg-orange-600 text-white text-[8px] md:text-[10px] rounded-full flex items-center justify-center font-black border-2 border-white">
                    {archivedTasks.length}
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

          <main className="p-4 md:p-8 dark:bg-slate-900">
            {children}
          </main>

          {isModalOpen && (
            <CreateTaskModal
              onClose={() => setIsModalOpen(false)}
              onAdd={handleAddTask}
            />
          )}
        </div>

        <ArchiveDrawer
          isOpen={isArchiveOpen}
          onClose={() => setIsArchiveOpen(false)}
          tasks={archivedTasks}
          onDelete={handleDeleteTask}
        />
      </div>
    </TaskContext.Provider>
  );
}