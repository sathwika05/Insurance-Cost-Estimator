import { NavBar } from '@/components/NavBar';
import { PredictorSection } from '@/components/PredictorSection';
import { AboutModelSection } from '@/components/AboutModelSection';
import { PerformanceSection } from '@/components/PerformanceSection';
import { DatasetSection } from '@/components/DatasetSection';
import { ArchitectureSection } from '@/components/ArchitectureSection';
import { FooterSection } from '@/components/FooterSection';

export default function Home() {
  return (
    <div className="min-h-dvh bg-background">
      {/* Sticky top navigation */}
      <NavBar />

      {/* Push content below the fixed nav (64px = h-16) */}
      <main className="pt-16">
        <PredictorSection />
        <AboutModelSection />
        <PerformanceSection />
        <DatasetSection />
        <ArchitectureSection />
      </main>

      <FooterSection />
    </div>
  );
}
