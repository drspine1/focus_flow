"use client";

import EnergyFilter from "@/components/dashboard/EnergyFilter";
import TaskCard from "@/components/dashboard/TaskCard";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back!</h1>
          <p className="text-black/90 mt-1">Here’s what we’re tackling based on your bandwidth today.</p>
        </div>
        <EnergyFilter />
      </div>

      {/* Grid for Task Cards - Now using the modular component */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <TaskCard 
    title="High Energy Task" 
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    energy="high"
    time="45 mins"
  />

  <TaskCard 
    title="Low Energy Task" 
    description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    energy="low"
    time="15 mins"
  />

  <TaskCard 
    title="Medium Energy Task" 
    description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    energy="mid"
    time="30 mins"
  />
</div>
    </div>
  );
}