import { Zap, BrainCircuit, Clock } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  energy: "low" | "mid" | "high";
  time: string;
}

export default function TaskCard({ title, description, energy, time }: TaskCardProps) {
  // Logic to change badge color based on energy level
  const energyStyles = {
    low: "bg-green-100 text-green-700",
    mid: "bg-blue-100 text-blue-700",
    high: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group border-b-4 border-b-transparent hover:border-b-blue-500">
      <div className="flex justify-between items-start mb-4">
        <span className={`${energyStyles[energy]} text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 capitalize`}>
          <Zap className="w-3 h-3" /> {energy} Energy
        </span>
        <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 hover:bg-blue-50 rounded">
          <BrainCircuit className="w-5 h-5" />
        </button>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-black/90 text-lg mb-6 line-clamp-2">{description}</p>
      
      <div className="flex items-center justify-between border-t border-slate-50 pt-4">
        <div className="flex items-center text-slate-400 text-xs gap-1">
          <Clock className="w-4 h-4" /> {time}
        </div>
        <button className="text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
          View Breakdown →
        </button>
      </div>
    </div>
  );
}