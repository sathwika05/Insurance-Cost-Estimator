import { Target, Hash, BarChart3, DatabaseZap, Quote, ArrowRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

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
    <section id="dataset" className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 border border-slate-300 text-slate-700 text-xs font-mono uppercase tracking-widest mb-6 font-bold shadow-sm">
            <DatabaseZap className="h-4 w-4 text-primary" /> Data Engineering
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Feature Matrix & Pipeline
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Exploratory insights and deterministic transformations applied to the benchmark Medical Cost Personal Dataset to forge a clean predictive signal.
          </p>
        </div>

        {/* Target Variable Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 p-10 md:p-16 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-primary/20 relative overflow-hidden">
             <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-5 pointer-events-none text-teal-100">
                <Target size={350} strokeWidth={1} />
             </div>
             <div className="relative z-10 flex-1 text-center md:text-left">
                <p className="text-teal-300 font-mono text-sm uppercase tracking-widest mb-4 font-bold">Predictive Output</p>
                <h4 className="text-3xl md:text-5xl font-bold mb-4">Target Variable: Annual Medical Charges</h4>
                <p className="text-teal-100/80 text-lg md:text-xl max-w-2xl leading-relaxed">Continuous numerical output (USD) modeled via regression analysis.</p>
             </div>
             <div className="relative z-10 shrink-0 mt-8 md:mt-0">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] px-12 py-10 shadow-inner">
                   <span className="text-[4rem] md:text-[6rem] font-mono font-black tracking-tighter text-white drop-shadow-lg leading-none">Y ∈ ℝ⁺</span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Feature Anatomy */}
        <div className="mb-32">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Feature Anatomy</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {FEATURES.map((f, i) => {
              const isNum = f.type === 'Numerical';
              const borderColor = isNum ? 'border-b-teal-500' : 'border-b-purple-500';
              const pillClass = isNum ? 'bg-teal-100 text-teal-800' : 'bg-purple-100 text-purple-800';
              
              return (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative p-6 pt-10 bg-white rounded-[2rem] border border-slate-200 border-b-[8px] ${borderColor} flex flex-col items-center text-center h-full overflow-hidden shadow-sm hover:shadow-2xl hover:border-b-[12px] transition-all duration-300`}
                >
                  <div className="absolute -right-2 -top-6 text-[10rem] font-black text-slate-100/60 select-none pointer-events-none z-0 tracking-tighter leading-none">
                    {i + 1}
                  </div>
                  <div className="relative z-10 flex flex-col items-center h-full w-full mt-2">
                     <h4 className="font-extrabold text-slate-900 text-2xl mb-4">{f.name}</h4>
                     <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm ${pillClass}`}>
                       {f.type}
                     </span>
                     <p className="text-slate-600 text-base mt-auto font-medium leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* EDA & Pipeline Layout */}
        <div className="space-y-32">
           {/* EDA Insights Masonry Grid */}
           <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Exploratory Data Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-6">
                {EDA_INSIGHTS.map((item, idx) => {
                  const layouts = [
                    "md:col-span-2 md:row-span-2 bg-teal-50 border border-teal-100 text-teal-950", 
                    "md:col-span-1 md:row-span-1 bg-white shadow-sm border border-slate-200 text-slate-800",
                    "md:col-span-1 md:row-span-1 bg-slate-900 border border-slate-800 text-slate-100",
                    "md:col-span-1 md:row-span-1 bg-teal-900 border border-teal-800 text-teal-50",
                    "md:col-span-2 md:row-span-1 bg-white shadow-sm border border-slate-200 text-slate-800",
                  ];
              
                  const quoteColors = [
                    "text-teal-200/60",
                    "text-slate-100",
                    "text-slate-700/80",
                    "text-teal-800/80",
                    "text-slate-100",
                  ];
                  
                  return (
                     <motion.div 
                       key={idx}
                       initial={{ opacity: 0, scale: 0.95 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: idx * 0.1 }}
                       className={`relative p-10 md:p-12 rounded-[2.5rem] flex flex-col justify-center overflow-hidden transition-transform hover:scale-[1.02] duration-300 ${layouts[idx]}`}
                     >
                        <Quote className={`absolute -right-4 -top-4 w-40 h-40 rotate-12 ${quoteColors[idx]} pointer-events-none`} />
                        <p className={`relative z-10 font-bold leading-tight ${idx === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                           {item}
                        </p>
                     </motion.div>
                  );
                })}
              </div>
           </div>

           {/* Preprocessing Visual Pipeline */}
           <div className="pb-16">
              <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Transformation Pipeline</h3>
              <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:gap-6 relative z-10 bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                {PREPROCESSING.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 }}
                      className="flex items-center gap-5 px-8 py-5 rounded-full bg-slate-50 border border-slate-200 hover:border-primary hover:bg-primary/5 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary font-black text-base group-hover:bg-primary group-hover:text-white transition-colors">
                        {idx + 1}
                      </div>
                      <span className="text-lg font-bold text-slate-700 max-w-[240px] leading-snug group-hover:text-slate-900">
                        {step}
                      </span>
                    </motion.div>
                    {idx < PREPROCESSING.length - 1 && (
                      <>
                        <ArrowRight className="text-primary/40 w-10 h-10 hidden md:block shrink-0" strokeWidth={3} />
                        <ArrowDown className="text-primary/40 w-10 h-10 md:hidden shrink-0 my-2" strokeWidth={3} />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
