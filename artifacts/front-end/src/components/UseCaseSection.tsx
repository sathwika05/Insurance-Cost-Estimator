import { Fragment, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Workflow, Zap, Layers, MonitorSmartphone } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const STEPS = [
  { label: 'Customer Profile',  sub: '6 input features'        },
  { label: 'Input Validation',  sub: 'Schema validation'       },
  { label: 'ML Inference',      sub: 'Random Forest'           },
  { label: 'Cost Estimate',     sub: 'Predicted annual cost'   },
  { label: 'Decision Support',  sub: 'Data-driven insight'     },
];

const STACK = ['React', 'Pydantic Validation', 'FastAPI', 'Scikit-learn Pipeline', 'Random Forest'];

const VALUE = [
  {
    icon: Zap,
    title: 'Real-Time Inference',
    desc: 'Generates cost predictions immediately through the deployed FastAPI inference service.',
  },
  {
    icon: Layers,
    title: 'Consistent Scoring',
    desc: 'The same trained preprocessing and prediction pipeline processes every request consistently.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Accessible ML',
    desc: 'Transforms a trained machine learning model into an interactive application that can be used through a browser rather than remaining an offline notebook workflow.',
  },
];

const STEP_MS = 2200;
const TRAVEL_S = 1.6;

/** True once the viewport is wide enough for the workflow to run horizontally. */
function useIsWide() {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setWide(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return wide;
}

/** Thin connector line; carries a travelling light while its source node is active. */
function Connector({ active, wide }: { active: boolean; wide: boolean }) {
  const travel = wide
    ? { initial: { left: '-2%' }, animate: { left: '102%' } }
    : { initial: { top: '-2%' },  animate: { top: '102%'  } };

  return (
    <div className="relative flex-none self-center h-8 w-px bg-slate-200 lg:h-px lg:w-10 xl:w-14">
      {active && (
        <motion.span
          key={wide ? 'row' : 'col'}
          className="pointer-events-none absolute"
          style={wide ? { top: '50%', y: '-50%' } : { left: '50%', x: '-50%' }}
          initial={{ ...travel.initial, opacity: 0 }}
          animate={{ ...travel.animate, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: TRAVEL_S,
            ease: 'easeInOut',
            opacity: { duration: TRAVEL_S, times: [0, 0.18, 0.82, 1] },
          }}
        >
          <span className="relative block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_2px_rgba(13,148,136,0.35)]">
            {wide ? (
              <span className="absolute right-full top-1/2 h-px w-10 -translate-y-1/2 bg-gradient-to-l from-primary/60 to-transparent" />
            ) : (
              <span className="absolute bottom-full left-1/2 h-8 w-px -translate-x-1/2 bg-gradient-to-t from-primary/60 to-transparent" />
            )}
          </span>
        </motion.span>
      )}
    </div>
  );
}

export function UseCaseSection() {
  const reduced = useReducedMotion();
  const wide = useIsWide();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % STEPS.length), STEP_MS);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <motion.section
      id="usecase"
      className="py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-6">
            <Workflow className="h-3.5 w-3.5" /> Real-World Application
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Insurance Cost Estimation
          </h2>
          <p className="max-w-2xl text-base text-slate-600 leading-relaxed">
            A full-stack machine learning system that transforms customer demographic and lifestyle
            inputs into real-time medical insurance cost estimates.
          </p>
        </div>

        {/* Section 1 — Problem → Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          <div className="border-l-2 border-primary pl-5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
              The Problem
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Insurance cost estimation requires translating multiple customer attributes into a
              consistent cost assessment. Traditional analysis can involve multiple inputs and manual
              evaluation before an estimate is produced.
            </p>
          </div>
          <div className="border-l-2 border-primary pl-5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-primary mb-3">
              The Solution
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The application validates customer inputs, processes them through a trained machine
              learning pipeline, and serves an estimated annual insurance cost through a real-time
              web experience.
            </p>
          </div>
        </div>

        {/* Section 2 — System Workflow */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">
            System Workflow
          </h3>

          <Card className="bg-white border-border shadow-sm">
            <CardContent className="px-4 py-8 sm:px-6 md:px-8 md:py-10">
              <div className="flex flex-col items-center lg:flex-row lg:items-stretch">
                {STEPS.map((step, i) => {
                  const isActive = !reduced && phase === i;
                  return (
                    <Fragment key={step.label}>
                      <div
                        className={`flex w-full max-w-xs flex-col justify-center rounded-xl border bg-white px-3 py-5 text-center transition-all duration-700 lg:max-w-none lg:min-w-0 lg:flex-1 ${
                          isActive
                            ? 'border-primary/50 shadow-[0_0_0_4px_rgba(13,148,136,0.07)]'
                            : 'border-slate-200 shadow-sm'
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-colors duration-700 ${
                              isActive ? 'bg-primary' : 'bg-slate-300'
                            }`}
                          />
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="text-sm font-semibold leading-snug text-slate-900">
                          {step.label}
                        </p>
                        <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                          {step.sub}
                        </p>
                      </div>
                      {i < STEPS.length - 1 && (
                        <Connector active={isActive} wide={wide} />
                      )}
                    </Fragment>
                  );
                })}
              </div>

              {/* Technical metadata */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-slate-100 pt-6">
                {STACK.map((item, i) => (
                  <span key={item} className="flex items-center gap-2">
                    {i > 0 && <span className="text-slate-300">→</span>}
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {item}
                    </span>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 3 — Business Value */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {VALUE.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-lg border border-slate-200 bg-white/60 p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500">
                    {v.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
