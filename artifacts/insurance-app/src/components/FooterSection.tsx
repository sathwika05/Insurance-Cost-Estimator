import { Activity } from 'lucide-react';

const TECHNOLOGIES = [
  'Python',
  'Scikit-learn',
  'XGBoost',
  'FastAPI',
  'React + Vite',
  'TypeScript',
  'Replit',
];

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Activity className="h-4 w-4 text-primary" />
            </span>
            <span className="font-semibold text-foreground">Insurance Cost Predictor</span>
          </div>

          {/* Disclaimers */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Educational machine learning application
            </p>
            <p className="text-xs text-muted-foreground max-w-xl">
              Predictions are estimates and are not official insurance quotations. This tool is
              intended for academic demonstration purposes only.
            </p>
          </div>

          {/* Technologies */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Technologies Used
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {TECHNOLOGIES.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground/60">
            Built with Replit AI Agent · ISEM 503 Project · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
