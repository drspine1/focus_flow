"use client";

import React, { FC } from 'react';

interface MomentumBarProps {
  progress: number;
  completedCount: number;
  totalCount: number;
}

const MomentumBar: FC<MomentumBarProps> = ({ 
  progress, 
  completedCount, 
  totalCount 
}) => {
  
  const safeProgress = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <div>
          {/* Changed label from "Daily" to "Mission" for Micro-tracking */}
          <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-1 text-blue-600/80">
            Mission Progress
          </h4>
          <p className="text-lg font-black text-black leading-none">
            {Math.round(safeProgress)}%
          </p>
        </div>
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
          {completedCount} / {totalCount} Steps
        </p>
      </div>
      
      {/* Progress Track - Slightly thinner for a "Micro" feel */}
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-1000 ease-in-out"
          style={{ width: `${safeProgress}%` }}
          role="progressbar"
          aria-valuenow={safeProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      
      {/* Added a small helper text for context */}
      <p className="mt-2 text-[12px] font-medium text-slate-500 italic">
        {safeProgress === 100 ? "task completed!" : "task in progression..."}
      </p>
    </div>
  );
};

export default MomentumBar;