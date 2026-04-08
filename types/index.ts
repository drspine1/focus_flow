export type EnergyLevel = "high" | "mid" | "low";

export interface Task {
  id: string;
  title: string;
  energy: EnergyLevel;
  category: string;
  time: string;
  isCompleted: boolean;
}