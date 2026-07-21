import React from 'react';
import { TrendingUp, BookOpen, BarChart2, Database, ChevronRight, Activity } from 'lucide-react';

export function DataStudio() {
  return (
    <div className="flex h-screen w-full bg-white text-[#111827] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[200px] flex-shrink-0 bg-[#1e2433] text-white flex flex-col justify-between">
        <div>
          {/* Logo / App Name */}
          <div className="p-4 py-6">
             <div className="flex items-center gap-2 mb-2 text-[#f59e0b]">
                <Activity size={20} />
             </div>
             <h1 className="text-sm font-bold leading-tight">
               Medical Insurance<br/>Cost Predictor
             </h1>
          </div>
          
          {/* Navigation */}
          <nav className="mt-4 flex flex-col">
            <NavItem 
              icon={<TrendingUp size={18} />} 
              title="Predictor" 
              subtext="Run a prediction" 
              isActive 
            />
            <NavItem 
              icon={<BookOpen size={18} />} 
              title="About Model" 
              subtext="How it was built" 
            />
            <NavItem 
              icon={<BarChart2 size={18} />} 
              title="Performance" 
              subtext="Model metrics" 
            />
            <NavItem 
              icon={<Database size={18} />} 
              title="Dataset" 
              subtext="Data & EDA insights" 
            />
          </nav>
        </div>

        {/* Footer text */}
        <div className="p-4 text-xs text-gray-400 leading-tight">
          Educational ML application. Not an official quote.
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 flex items-center px-8 flex-shrink-0">
          <div className="flex items-center text-sm text-gray-500">
            <span>Predictor</span>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-[#111827] font-medium">New Estimate</span>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[640px] mx-auto w-full">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Run a prediction</h2>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-[#111827]">Patient Information</h3>
                <p className="text-sm text-gray-500 mt-1">Complete all fields to generate a cost estimate</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Age */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#6b7280]">Age</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 35" 
                      className="h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-shadow"
                    />
                  </div>
                  {/* Sex */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#6b7280]">Sex</label>
                    <div className="relative">
                      <select className="h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-shadow appearance-none cursor-pointer">
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  {/* BMI */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#6b7280]">BMI (Body Mass Index)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 24.5" 
                      className="h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-shadow"
                    />
                  </div>
                  {/* Number of Children */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#6b7280]">Number of Children</label>
                    <input 
                      type="number" 
                      defaultValue={0} 
                      className="h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-shadow"
                    />
                  </div>
                  {/* Smoker */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#6b7280]">Smoker</label>
                    <div className="relative">
                      <select className="h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-shadow appearance-none cursor-pointer">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  {/* Region */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#6b7280]">Region</label>
                    <div className="relative">
                      <select className="h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent transition-shadow appearance-none cursor-pointer">
                        <option>Northeast</option>
                        <option>Northwest</option>
                        <option>Southeast</option>
                        <option>Southwest</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm">
                    Calculate Cost
                  </button>
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="bg-white rounded-lg border border-gray-200 border-l-4 border-l-[#f59e0b] shadow-sm p-6 flex items-center justify-between">
              <div>
                <h3 className="text-[#6b7280] font-medium text-xs uppercase tracking-wider mb-1">Estimated Annual Cost</h3>
                <p className="text-sm text-gray-500">Based on your patient profile</p>
              </div>
              <div className="text-3xl font-bold text-[#f59e0b]">
                $12,450.00
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, title, subtext, isActive = false }: { icon: React.ReactNode, title: string, subtext: string, isActive?: boolean }) {
  return (
    <div className={`flex items-start gap-3 px-4 py-3 border-l-4 cursor-pointer transition-colors ${isActive ? 'border-[#f59e0b] bg-white/5' : 'border-transparent hover:bg-white/5'}`}>
      <div className={`mt-0.5 ${isActive ? 'text-[#f59e0b]' : 'text-gray-400'}`}>
        {icon}
      </div>
      <div>
        <div className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
          {title}
        </div>
        <div className="text-[10px] text-gray-500 mt-0.5">
          {subtext}
        </div>
      </div>
    </div>
  );
}
