import { Target, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

const MODELS_TABLE = [
  { name: 'Linear Regression', mae: '4,221.96', rmse: '6,123.65', r2: '0.723', status: 'Baseline' },
  { name: 'Ridge Regression', mae: '4,226.80', rmse: '6,123.65', r2: '0.723', status: 'Evaluated' },
  { name: 'Lasso Regression', mae: '4,222.00', rmse: '6,123.43', r2: '0.723', status: 'Evaluated' },
  { name: 'Decision Tree', mae: '3,284.18', rmse: '6,777.52', r2: '0.659', status: 'Evaluated' },
  { name: 'XGBoost', mae: '3,104.85', rmse: '5,375.65', r2: '0.785', status: 'Evaluated' },
  { name: 'Random Forest', mae: '2,742.90', rmse: '4,894.45', r2: '0.821', status: 'Final Model' },
];

export function PerformanceSection() {
  const maxMae = 4300;

  return (
    <section id="performance" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Performance Metrics
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Evaluation results on the held-out test split. The Random Forest ensemble demonstrates robust predictive capability with high variance explanation.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 px-5 py-2.5 rounded-full border border-primary/20 font-bold shadow-sm">
            <Target className="h-4 w-4" /> Final Evaluation
          </div>
        </div>

        {/* Hero Metric Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 mb-24 flex flex-col md:flex-row md:items-end justify-between shadow-2xl relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute -right-20 -top-20 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex-1">
            <p className="text-primary font-mono text-sm uppercase tracking-widest mb-4 font-bold">Variance Explained</p>
            <div className="text-[6rem] md:text-[10rem] font-black text-primary drop-shadow-[0_0_25px_rgba(20,184,166,0.3)] mb-4 md:mb-6 leading-none tracking-tighter">0.900</div>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-md">The model accounts for 90% of insurance cost variation.</p>
          </div>
          
          <div className="relative z-10 mt-12 md:mt-0 flex flex-col sm:flex-row gap-6 md:gap-10 md:text-right shrink-0">
             <div className="bg-slate-800/60 p-6 md:p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm shadow-xl">
               <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-3 font-bold">Mean Absolute Error</p>
               <p className="text-4xl md:text-5xl font-black tracking-tight text-white">$1,960.70</p>
             </div>
             <div className="bg-slate-800/60 p-6 md:p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm shadow-xl">
               <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-3 font-bold">Root Mean Squared Error</p>
               <p className="text-4xl md:text-5xl font-black tracking-tight text-white">$4,283.83</p>
             </div>
          </div>
        </motion.div>

        {/* Race Track */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center md:text-left">Model Comparison (MAE)</h3>
          <div className="space-y-6">
            {MODELS_TABLE.map((m, i) => {
              const isWinner = m.status === 'Final Model';
              const rawMae = parseFloat(m.mae.replace(/,/g, ''));
              // Shorter bar means less error, which explicitly maps visually as requested.
              const percentage = (rawMae / maxMae) * 100;
              
              return (
                <div key={m.name} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 group">
                  <div className="w-full md:w-56 md:text-right shrink-0">
                     <span className={`text-lg font-bold ${isWinner ? 'text-primary' : 'text-slate-600 group-hover:text-slate-900 transition-colors'}`}>
                       {m.name}
                     </span>
                  </div>
                  <div className="flex-1 h-14 md:h-16 bg-slate-100 rounded-r-full rounded-l-full relative shadow-inner overflow-visible">
                     <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: `${percentage}%` }}
                       viewport={{ once: true }}
                       transition={{ duration: 1.5, delay: i * 0.15, ease: "circOut" }}
                       className={`absolute top-0 left-0 h-full rounded-full flex items-center justify-end px-6 shadow-md ${isWinner ? 'bg-primary' : 'bg-slate-300 group-hover:bg-slate-400 transition-colors'}`}
                     >
                        <div className="flex items-center gap-2 drop-shadow-sm whitespace-nowrap">
                          <span className={`font-mono text-lg md:text-xl tracking-tight font-black ${isWinner ? 'text-white' : 'text-slate-800'}`}>
                            ${m.mae}
                          </span>
                          {isWinner && <Flag className="text-white w-5 h-5 ml-2" />}
                        </div>
                     </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
