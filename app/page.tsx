export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Day 1: #ENg30DayChallenge 
        </p>
      </div>

      <div className="text-center mt-10">
        <h1 className="text-6xl font-bold text-slate-900 mb-6">
          FocusFlow
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          AI-powered productivity that respects your bandwidth. 
          Break down tasks and manage your energy, not just your time.
        </p>
        
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Start Building
          </button>
          <button className="border border-slate-300 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition">
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold mb-2"> AI Task Decomposition</h3>
          <p className="text-slate-500 text-sm">Automatically split big goals into manageable sub-tasks using GPT-4.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold mb-2">Energy Tracking</h3>
          <p className="text-slate-500 text-sm">Tag tasks by mental load and filter your day based on how you feel.</p>
        </div>
      </div>
    </main>
  );
}