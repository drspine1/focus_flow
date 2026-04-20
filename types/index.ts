export type EnergyLevel = "high" | "mid" | "low";


export interface SubTask {
  id: string;
  title: string;
  isCompleted: boolean;
  energy?: "low" | "mid" | "high";
}

export interface Task {
  id: string;
  title: string;
  energy: 'low' | 'mid' | 'high';
  category: string;
  time: string;
  isCompleted: boolean;
  createdAt: number;
  subtasks: SubTask[]; // Added for Day 6
}