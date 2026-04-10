"use client";

import React, { FC } from 'react';

// 1. Defined the shape of the data
interface MomentumBarProps {
  progress: number;
  completedCount: number;
  totalCount: number;
}

// 2. Used FC (Functional Component) type for stricter TS checking
const MomentumBar: FC<MomentumBarProps> = ({ 
  progress, 
  completedCount, 
  totalCount 
}) => {
  
  // 3. Ensure progress is a valid number between 0 and 100
  // This prevents the CSS from breaking if progress is NaN or infinity
  const safeProgress = Number.isFinite(progress) ? Math.min(Math.max(progress, 0), 100) : 0;

  return (
    <div className="mb-6 md:mb-10 bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-end mb-3 md:mb-4">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Daily Momentum
          </h4>
          <p className="text-xl md:text-2xl font-black text-black">
            {Math.round(safeProgress)}%
          </p>
        </div>
        <p className="text-xs font-bold text-slate-500">
          {completedCount} / {totalCount} Wins
        </p>
      </div>
      
      {/* Progress Track */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-700 ease-out"
          style={{ width: `${safeProgress}%` }}
          role="progressbar"
          aria-valuenow={safeProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default MomentumBar;