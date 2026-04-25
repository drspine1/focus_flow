"use client";

import { useMemo } from "react";
import { BarChart3, Zap, Target, Award } from "lucide-react";
import EnergyChart from "@/components/EnergyChart";
import { useTasks } from "../layout";

export default function AnalyticsPage() {
  const { tasks } = useTasks();
  
  const metrics = useMemo(() => {
    const completed = tasks.filter(t => t.isCompleted);
    const completedCount = completed.length;
    const totalCount = tasks.length;
    const rate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    const highEnergyDone = completed.filter(t => t.energy === 'high').length;
    const focusScore = highEnergyDone > 2 ? "Elite" : completedCount > 0 ? "Steady" : "Idle";

    // Real-time weekly data: map tasks to days of the week by createdAt
    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const today = new Date().getDay(); // 0=Sun, 6=Sat
    const weeklyData = dayLabels.map((day, i) => {
      const dayTasks = tasks.filter(t => {
        if (!(t as any).createdAt) return false;
        const d = new Date((t as any).createdAt).getDay();
        return d === i;
      });
      const dayCompleted = dayTasks.filter(t => t.isCompleted).length;
      const dayTotal = dayTasks.length;
      const value = dayTotal > 0 ? Math.round((dayCompleted / dayTotal) * 100) : 0;
      return { day, value, isToday: i === today };
    });

    return { completedCount, totalCount, rate, focusScore, weeklyData };
  }, [tasks]);

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 dark:bg-slate-900 dark:text-slate-100">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl text-black dark:text-slate-100 uppercase italic tracking-tight">Performance Stats</h1>
          <p className="text-slate-700 dark:text-slate-400 font-medium">Visualizing your productivity patterns.</p>
        </div>
        {metrics.completedCount > 0 && (
          <div className="bg-orange-500 text-white shadow-lg shadow-orange-100 px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest text-center self-start md:self-auto">
             Active Streak
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<Target className="text-blue-600" size={20} />} 
          label="Completion Rate" 
          value={`${metrics.rate}%`} 
          subtext={`${metrics.completedCount} of ${metrics.totalCount} objectives`}
        />
        <StatCard 
          icon={<Award className="text-orange-500" size={20} />} 
          label="Total Wins" 
          value={metrics.completedCount.toString()} 
          subtext="archived in this session"
        />
        <StatCard 
          icon={<Zap className="text-yellow-500" size={20} />} 
          label="Focus Score" 
          value={metrics.focusScore} 
          subtext="Based on task intensity"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-4 md:p-6 lg:p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
               <Zap className="text-orange-600" size={16} />
            </div>
            <h2 className="font-bold uppercase text-sm tracking-wider text-slate-700 dark:text-slate-400">Energy Mix</h2>
          </div>
          <div className="flex justify-center">
            <EnergyChart tasks={tasks} />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between group overflow-hidden">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="text-blue-600" size={18} />
              <h3 className="md:text-xl text-[16px] font-bold uppercase text-black dark:text-slate-100 tracking-tight">Weekly Momentum</h3>
            </div>
            <p className="text-slate-700 dark:text-slate-400 text-sm max-w-xs">
              Live activity tracking based on current task volume.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-7 gap-1 items-end h-[120px] w-full">
             {metrics.weeklyData.map((data, i) => (
               <div key={i} className="flex flex-col items-center gap-2 group/bar w-full">
                 <div className="opacity-0 group-hover/bar:opacity-100 bg-slate-800 text-white text-[9px] py-1 px-1.5 rounded mb-1 transition-opacity whitespace-nowrap">
                    {data.value}%
                 </div>
                 <div 
                   style={{ height: `${Math.max(data.value, 4)}%` }} 
                   className={`w-full max-w-[32px] rounded-t-md transition-all duration-700 ${data.isToday ? 'bg-blue-600 shadow-md shadow-blue-50' : 'bg-slate-100 dark:bg-slate-700'}`} 
                 />
                 <span className={`text-[10px] font-bold mt-1 ${data.isToday ? 'text-blue-600' : 'text-slate-400'}`}>
                    {data.day}
                 </span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext }: { icon: React.ReactNode, label: string, value: string, subtext: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-[28px] border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:border-blue-100">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400">{label}</span>
      </div>
      <div className="text-3xl font-black mb-1 text-slate-800 dark:text-slate-100">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{subtext}</div>
    </div>
  );
}