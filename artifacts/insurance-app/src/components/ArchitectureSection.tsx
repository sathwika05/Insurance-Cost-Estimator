import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Server, ShieldCheck, GitBranch, Brain, ArrowDown } from 'lucide-react';

const FLOW = [
  {
    icon: Monitor,
    label: 'React + Vite Frontend',
    sublabel: 'Form input & result display',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    icon: Server,
    label: 'FastAPI Backend',
    sublabel: 'REST endpoint  POST /api/predict',
    color: 'bg-teal-50 text-teal-600 border-teal-100',
  },
  {
    icon: ShieldCheck,
    label: 'Input Validation',
    sublabel: 'Pydantic schema — age, sex, BMI, children, smoker, region',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    icon: GitBranch,
    label: 'Preprocessing Pipeline',
    sublabel: 'ColumnTransformer — one-hot encoding & feature scaling',
    color: 'bg-purple-50 text-purple-600 border-purple-100',
  },
  {
    icon: Brain,
    label: 'Trained Machine Learning Model',
    sublabel: 'XGBoost regressor — loaded via joblib at startup',
    color: 'bg-primary/5 text-primary border-primary/20',
  },
  {
    icon: Server,
    label: 'Prediction Response',
    sublabel: '{ estimated_annual_cost, currency: "USD" }',
    color: 'bg-green-50 text-green-600 border-green-100',
  },
];

export function ArchitectureSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            Application Architecture
          </h2>
          <p className="text-base text-muted-foreground">
            A request flows from the browser through validation and preprocessing before reaching the ML model.
          </p>
        </div>

        <div className="flex flex-col items-center gap-0">
          {FLOW.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex w-full flex-col items-center">
                <Card className={`w-full max-w-md border shadow-sm ${step.color.includes('bg-primary') ? 'ring-1 ring-primary/30' : ''}`}>
                  <CardContent className="flex items-center gap-4 py-4 px-5">
                    <span
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border ${step.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.sublabel}</p>
                    </div>
                  </CardContent>
                </Card>
                {i < FLOW.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="h-4 w-px bg-border" />
                    <ArrowDown className="h-4 w-4 text-muted-foreground" />
                    <div className="h-1 w-px bg-border" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
