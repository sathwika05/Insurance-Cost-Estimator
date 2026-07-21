import { useState } from 'react';
import { Activity, TrendingUp, BookOpen, BarChart2, Database, Menu, X, Hexagon } from 'lucide-react';
import { motion } from 'framer-motion';

export type TabId = 'predictor' | 'about' | 'performance' | 'dataset';

interface NavBarProps {
  active: TabId;
  onNav: (tab: TabId) => void;
}

const NAV_ITEMS: { id: TabId; label: string; Icon: React.ElementType; desc: string }[] = [
  { id: 'predictor',   label: 'Predictor',    Icon: TrendingUp,  desc: 'Run a prediction'    },
  { id: 'about',       label: 'About Model',  Icon: BookOpen,    desc: 'How it was built'    },
  { id: 'performance', label: 'Performance',  Icon: BarChart2,   desc: 'Model metrics'       },
  { id: 'dataset',     label: 'Dataset',      Icon: Database,    desc: 'Data & EDA insights' },
];

export function NavBar({ active, onNav }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: TabId) => {
    onNav(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────────────────────── */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-sidebar-border bg-sidebar shadow-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border/50 relative overflow-hidden">
          <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <Hexagon className="h-5 w-5 text-primary" />
          </span>
          <div className="relative min-w-0">
            <p className="truncate text-sm font-bold text-foreground tracking-wide uppercase">
              Omni<span className="text-primary">Predict</span>
            </p>
            <p className="truncate text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Research Terminal</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2" aria-label="Dashboard">
          {NAV_ITEMS.map(({ id, label, Icon, desc }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`group relative w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <div className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-primary/20 text-primary' : 'bg-transparent text-muted-foreground group-hover:text-foreground'}`}>
                  <Icon className="h-4 w-4 flex-shrink-0" />
                </div>
                <div className="relative min-w-0">
                  <p className={`text-sm font-semibold leading-tight truncate transition-colors ${isActive ? 'text-primary' : 'text-foreground'}`}>{label}</p>
                  <p className="text-[10px] font-medium tracking-wide truncate text-muted-foreground uppercase mt-0.5">
                    {desc}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-sidebar-border/50 px-6 py-5 bg-slate-50">
          <p className="text-[10px] font-mono text-muted-foreground leading-relaxed uppercase tracking-wider">
            ISEM 503 Project<br />v1.0.0
          </p>
        </div>
      </aside>

      {/* ── Mobile top bar ────────────────────────────────────────────── */}
      <header className="md:hidden fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-sidebar px-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Hexagon className="h-4 w-4 text-primary" />
          </span>
          <span className="text-sm font-bold text-foreground uppercase tracking-wide">Omni<span className="text-primary">Predict</span></span>
        </div>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <nav className="relative z-10 mt-16 w-64 bg-sidebar border-r border-sidebar-border shadow-2xl px-4 py-6 space-y-2 overflow-y-auto">
            {NAV_ITEMS.map(({ id, label, Icon, desc }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className={`group relative w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                >
                  <div className={`relative flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? 'bg-primary/20' : 'bg-transparent'}`}>
                    <Icon className="h-4 w-4 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
