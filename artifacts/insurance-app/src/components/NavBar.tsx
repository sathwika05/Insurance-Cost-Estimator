import { useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import { useHealthCheck } from '@workspace/api-client-react';

export type TabId = 'predictor' | 'about' | 'performance' | 'dataset';

interface NavBarProps {
  active: TabId;
  onNav: (tab: TabId) => void;
}

const NAV_ITEMS: { id: TabId; label: string; desc: string }[] = [
  { id: 'predictor',   label: 'Predictor',    desc: 'Run a prediction'    },
  { id: 'about',       label: 'About Model',  desc: 'How it was built'    },
  { id: 'performance', label: 'Performance',  desc: 'Model metrics'       },
  { id: 'dataset',     label: 'Dataset',      desc: 'Data & EDA insights' },
];

export function NavBar({ active, onNav }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: health } = useHealthCheck();

  const handleNav = (id: TabId) => {
    onNav(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header className="fixed inset-x-0 top-0 z-40 bg-[#0f172a] text-white flex-none shadow-sm h-[72px] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 md:w-1/4">
            <div className="bg-teal-500/20 p-2 rounded-lg text-teal-400">
              <Activity className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <span className="font-semibold text-white tracking-tight hidden sm:inline-block">
              Medical Insurance Cost Predictor
            </span>
            <span className="font-semibold text-white tracking-tight sm:hidden">
              Cost Predictor
            </span>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex space-x-8 h-full">
            {NAV_ITEMS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => handleNav(tab.id)}
                  className={`flex flex-col justify-center px-2 h-full border-b-[3px] cursor-pointer transition-colors hover:bg-white/5 ${
                    isActive ? 'border-[#0d9488]' : 'border-transparent'
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 hidden lg:block">
                    {tab.desc}
                  </span>
                </div>
              );
            })}
          </nav>

          {/* Right Side: Badge & Mobile Menu */}
          <div className="flex items-center justify-end gap-4 md:w-1/4">
            {/* Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
              {health?.status === 'ok' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.4)]"></span>
                  <span className="text-xs font-medium text-slate-200">Model Ready</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span className="text-xs font-medium text-slate-200">Offline</span>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <nav className="relative z-10 mt-[72px] w-64 bg-[#0f172a] shadow-2xl px-4 py-6 space-y-2 overflow-y-auto h-[calc(100vh-72px)]">
            {NAV_ITEMS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNav(tab.id)}
                  className={`w-full flex flex-col text-left px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-[#0d9488]/20 border border-[#0d9488]/30' : 'hover:bg-white/5'
                  }`}
                >
                  <span className={`text-sm font-semibold ${isActive ? 'text-teal-400' : 'text-slate-300'}`}>
                    {tab.label}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">{tab.desc}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
