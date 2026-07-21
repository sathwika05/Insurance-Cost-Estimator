import { useState } from 'react';
import { NavBar, type TabId } from '@/components/NavBar';
import { PredictorSection } from '@/components/PredictorSection';
import { AboutModelSection } from '@/components/AboutModelSection';
import { PerformanceSection } from '@/components/PerformanceSection';
import { DatasetSection } from '@/components/DatasetSection';

const PANELS: Record<TabId, React.ReactNode> = {
  predictor:   <PredictorSection />,
  about:       <AboutModelSection />,
  performance: <PerformanceSection />,
  dataset:     <DatasetSection />,
};

export default function Home() {
  const [active, setActive] = useState<TabId>('predictor');

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Sidebar / mobile top bar */}
      <NavBar active={active} onNav={setActive} />

      {/* Content panel — offset for sidebar on desktop, top bar on mobile */}
      <main
        key={active}
        className="flex-1 overflow-y-auto md:ml-56 mt-14 md:mt-0"
      >
        {PANELS[active]}
      </main>
    </div>
  );
}
