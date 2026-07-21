import { Card, CardContent } from '@/components/ui/card';
import { Target, Hash, BarChart3, DatabaseZap } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  { name: 'Age', type: 'Numerical', desc: 'Beneficiary age (18–64)', icon: Hash, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { name: 'Sex', type: 'Categorical', desc: 'Biological sex', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  { name: 'BMI', type: 'Numerical', desc: 'Body mass index ratio', icon: Hash, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { name: 'Children', type: 'Numerical', desc: 'Number of dependents', icon: Hash, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { name: 'Smoker', type: 'Categorical', desc: 'Tobacco smoking status', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  { name: 'Region', type: 'Categorical', desc: 'US geographic region', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
];

const EDA_INSIGHTS = [
  'Zero missing values detected across the full 1,338 records.',
  'Target variable (charges) is heavily right-skewed; implies logarithmic transformation utility.',
  'Smoking status exhibits highest singular correlation with medical charges.',
  'Age and BMI show moderate positive linear relationships with cost.',
  'No severe multicollinearity found among independent continuous features.',
];

const PREPROCESSING = [
  'One-hot encoding applied to nominal categorical predictors.',
  'StandardScaler normalization fitted on continuous numeric predictors.',
  'Target log-transformed to stabilize variance and normalize error distribution.',
  'Rigid 80/20 train-test split executed prior to any scaling to prevent leakage.',
  'Scikit-learn Pipeline utilized to bind transformations securely.',
];

export function DatasetSection() {
  return (
    <motion.section 
      id="dataset" 
      className="py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono uppercase tracking-widest mb-6">
            <DatabaseZap className="h-3.5 w-3.5 text-primary" /> Data Engineering
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Feature Matrix & Pipeline
          </h2>
          <p className="max-w-2xl text-base text-slate-600 leading-relaxed">
            Exploratory insights and deterministic transformations applied to the benchmark Medical Cost Personal Dataset to forge a clean predictive signal.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6 pl-1">Input Vectors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                >
                  <Card className={`bg-white border ${f.border} shadow-sm h-full`}>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className={`p-2 rounded-lg mb-3 ${f.bg} ${f.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{f.name}</p>
                      <p className={`text-[10px] font-mono font-semibold mt-1 mb-2 uppercase ${f.color}`}>{f.type}</p>
                      <p className="text-xs text-slate-500 leading-tight">{f.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Target */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-white to-white p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Target Variable: Annual Medical Charges</h4>
              <p className="text-sm text-slate-600">Continuous numerical output (USD) modeled via regression analysis.</p>
            </div>
            <div className="md:ml-auto flex shrink-0">
              <div className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono uppercase text-primary tracking-wider">
                Y ∈ ℝ⁺
              </div>
            </div>
          </div>
        </motion.div>

        {/* Split Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white border-border shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-sm font-mono uppercase tracking-widest text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Exploratory Findings
              </h3>
              <ul className="space-y-4">
                {EDA_INSIGHTS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="text-primary mt-0.5 opacity-70">■</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-border shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent" />
            <CardContent className="p-8">
              <h3 className="text-sm font-mono uppercase tracking-widest text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Transformation Strategy
              </h3>
              <ul className="space-y-4">
                {PREPROCESSING.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="text-primary mt-0.5 opacity-70">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}