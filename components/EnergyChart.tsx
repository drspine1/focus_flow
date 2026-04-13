"use client";

import { useState, useEffect } from 'react'; 
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = {
  high: '#f97316',
  mid: '#3b82f6',
  low: '#22c55e',
};

export default function EnergyChart({ tasks }: { tasks: any[] }) {
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: 'High Power', value: tasks.filter(t => t.energy === 'high' && !t.isCompleted).length, key: 'high' },
    { name: 'Medium', value: tasks.filter(t => t.energy === 'mid' && !t.isCompleted).length, key: 'mid' },
    { name: 'Low Energy', value: tasks.filter(t => t.energy === 'low' && !t.isCompleted).length, key: 'low' },
  ].filter(d => d.value > 0);

  
  if (!mounted) return <div className="h-[300px] w-full bg-white rounded-[32px] border border-slate-100 shadow-sm" />;

  return (
    <div className="h-[300px] w-full bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm flex flex-col">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-black/80 mb-4">
        Active Energy Mix
      </h3>
      
      <div className="flex-1 min-h-0"> 
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.key as keyof typeof COLORS]} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-500 text-xs font-medium">Add tasks to see distribution</p>
          </div>
        )}
      </div>
    </div>
  );
}