// Change this line:
export default function Loading() { 
  return (
    <div className="bg-slate-100 animate-pulse rounded-[28px] h-32 w-full relative overflow-hidden">
      {/* The Shimmer Gradient */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}