import Sidebar from "@/components/layout/sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar: 
         Stays hidden on mobile via its internal 'hidden md:flex' classes 
      */}
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center px-4 md:px-8 justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Mobile Navigation: 
               This will only render the hamburger menu on small screens 
            */}
            <MobileNav />
            
            <h2 className="font-semibold text-slate-800 text-lg hidden sm:block">
              My Workspace
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-sm">
              <span className="sm:hidden">+</span>
              <span className="hidden sm:inline">+ New Task</span>
            </button>
          </div>
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}