import { useState } from 'react';
import { Activity, TrendingUp, BookOpen, BarChart2, Database, Menu, X } from 'lucide-react';

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
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-56 flex-col border-r border-border bg-card">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground leading-tight">
              Insurance
            </p>
            <p className="truncate text-xs text-muted-foreground">Cost Predictor</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Dashboard">
          {NAV_ITEMS.map(({ id, label, Icon, desc }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => handleNav(id)}
                className={`group w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight truncate">{label}</p>
                  <p className={`text-[11px] truncate ${isActive ? 'text-primary/70' : 'text-muted-foreground/70'}`}>
                    {desc}
                  </p>
                </div>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-border px-5 py-4">
          <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
            Educational ML application.<br />Not an official quote.
          </p>
        </div>
      </aside>

      {/* ── Mobile top bar ────────────────────────────────────────────── */}
      <header className="md:hidden fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
            <Activity className="h-3.5 w-3.5 text-primary" />
          </span>
          <span className="text-sm font-semibold text-foreground">Insurance Predictor</span>
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
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <nav className="relative z-10 mt-14 w-64 bg-card border-r border-border shadow-xl px-3 py-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(({ id, label, Icon, desc }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => handleNav(id)}
                  className={`group w-full flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
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
