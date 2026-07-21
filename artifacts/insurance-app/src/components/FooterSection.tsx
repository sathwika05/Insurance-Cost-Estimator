import { Hexagon } from 'lucide-react';

const TECHNOLOGIES = [
  'Python',
  'Scikit-learn',
  'FastAPI',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion'
];

export function FooterSection() {
  return (
    <footer className="border-t border-white/5 bg-black/50 py-12 relative z-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <Hexagon className="h-4 w-4 text-primary" />
              </span>
              <span className="font-bold text-foreground uppercase tracking-wide text-sm">
                Omni<span className="text-primary">Predict</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground/60 max-w-sm leading-relaxed font-mono">
              Academic ML demonstration. Predictions operate as uncalibrated estimates; not valid for actuarial underwriting.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
              Stack Architecture
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 max-w-md">
              {TECHNOLOGIES.map((tech) => (
                <span
                  key={tech}
                  className="rounded px-2.5 py-1 border border-white/10 bg-white/5 text-[10px] font-mono text-muted-foreground uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
            ISEM 503 · {new Date().getFullYear()}
          </p>
          <p className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
            Deployed via Replit AI
          </p>
        </div>
      </div>
    </footer>
  );
}