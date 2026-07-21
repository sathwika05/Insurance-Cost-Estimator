import { useState } from 'react';
import { NavBar, type TabId } from '@/components/NavBar';
import { PredictorSection } from '@/components/PredictorSection';
import { AboutModelSection } from '@/components/AboutModelSection';
import { PerformanceSection } from '@/components/PerformanceSection';
import { DatasetSection } from '@/components/DatasetSection';
import { ArchitectureSection } from '@/components/ArchitectureSection';
import { FooterSection } from '@/components/FooterSection';
import { motion, AnimatePresence } from 'framer-motion';

const PANELS: Record<TabId, React.ReactNode> = {
  predictor:   <PredictorSection />,
  about:       <div className="space-y-0 divide-y divide-border/50"><AboutModelSection /><ArchitectureSection /></div>,
  performance: <PerformanceSection />,
  dataset:     <DatasetSection />,
};

export default function Home() {
  const [active, setActive] = useState<TabId>('predictor');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <NavBar active={active} onNav={setActive} />

      <main className="flex-1 w-full pt-[72px] flex flex-col scroll-smooth relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1">
              {PANELS[active]}
            </div>
            <FooterSection />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
