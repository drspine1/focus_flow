"use client";

import { useEffect, useState } from "react";

interface CircularProgressProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
}

export default function CircularProgress({ 
  progress = 0, 
  size = 180, 
  strokeWidth = 12 
}: CircularProgressProps) {
  const [mounted, setMounted] = useState(false);
  
  // Logic for the SVG circle math
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ width: size, height: size }} />;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
     
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-100"
        />
    
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{ 
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.8s ease-in-out" 
          }}
          strokeLinecap="round"
          fill="transparent"
          className="text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
        />
      </svg>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black">{Math.round(progress)}%</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Momentum</span>
      </div>
    </div>
  );
}