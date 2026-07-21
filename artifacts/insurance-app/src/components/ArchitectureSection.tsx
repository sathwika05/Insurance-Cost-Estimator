import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Server, ShieldCheck, GitBranch, Brain, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const FLOW = [
  {
    icon: Monitor,
    label: 'React Client',
    sublabel: 'Browser-based data entry & visualization',
    border: 'border-slate-200',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: ShieldCheck,
    label: 'Validation Layer',
    sublabel: 'Pydantic schema constraints (age, BMI bounds)',
    border: 'border-slate-200',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Server,
    label: 'FastAPI Router',
    sublabel: 'RESTful endpoint POST /api/predict',
    border: 'border-slate-200',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: GitBranch,
    label: 'Scikit-learn Pipeline',
    sublabel: 'OHE & Standard scaling on incoming vector',
    border: 'border-slate-200',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: Brain,
    label: 'Inference Engine',
    sublabel: 'Joblib-serialized Random Forest regressor',
    border: 'border-primary shadow-sm',
    bg: 'bg-primary/20',
    iconColor: 'text-primary',
  },
  {
    icon: Server,
    label: 'JSON Response',
    sublabel: 'Estimated cost payload returned to client',
    border: 'border-slate-200',
    bg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
];

export function ArchitectureSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-slate-50">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4 font-mono uppercase">
            System Topology
          </h2>
          <p className="text-sm text-slate-500 font-mono uppercase tracking-widest">
            End-to-End Request Lifecycle
          </p>
        </div>

        <div className="flex flex-col items-center w-full max-w-lg mx-auto">
          {FLOW.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={step.label} 
                className="flex w-full flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`w-full bg-white shadow-sm border ${step.border} transition-colors hover:shadow-md`}>
                  <CardContent className="flex items-center gap-5 p-5">
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-primary/20 ${step.bg}`}>
                      <Icon className={`h-5 w-5 ${step.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-1 tracking-wide">{step.label}</p>
                      <p className="text-[11px] font-mono text-slate-500 uppercase">{step.sublabel}</p>
                    </div>
                  </CardContent>
                </Card>
                {i < FLOW.length - 1 && (
                  <div className="flex flex-col items-center py-2 h-12">
                    <div className="h-full w-px bg-primary/30 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 rounded-full p-0.5">
                        <ArrowDown className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}