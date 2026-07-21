import { motion } from 'framer-motion';
import { Network, CheckCircle2 } from 'lucide-react';

const WORKFLOW_STEPS = [
  { num: 1, title: 'Setup', desc: 'Import libraries, configure environment, and define random seed for reproducibility.' },
  { num: 2, title: 'Load Data', desc: 'Read insurance.csv into a Pandas DataFrame and inspect shape, dtypes, and sample rows.' },
  { num: 3, title: 'Exploratory Data Analysis', desc: 'Examine distributions, correlations, and relationships between features and the target.' },
  { num: 4, title: 'Data Preprocessing', desc: 'Encode categoricals with one-hot encoding; scale numerics for linear models; log-transform the target.' },
  { num: 5, title: 'Baseline Model', desc: 'Train a plain Linear Regression as a performance baseline.' },
  { num: 6, title: 'Model Selection via Cross-Validation', desc: 'Evaluate six candidate models using 5-fold cross-validation and select the best performer.' },
  { num: 7, title: 'Hyperparameter Tuning', desc: 'Run GridSearchCV on the top model to find optimal hyperparameters.' },
  { num: 8, title: 'Retrain with Best Parameters', desc: 'Refit the tuned model on the full training set using the parameters found in step 7.' },
  { num: 9, title: 'Final Evaluation', desc: 'Assess generalization on the held-out test set using MAE, RMSE, and R².' },
  { num: 10, title: 'Build Predictive System', desc: 'Serialize the trained pipeline with joblib and expose it through a FastAPI endpoint.' },
];

const MODELS = [
  { name: 'Linear Regression',        winner: false, score: 35 },
  { name: 'Ridge Regression',         winner: false, score: 35 },
  { name: 'Lasso Regression',         winner: false, score: 35 },
  { name: 'Decision Tree Regressor',  winner: false, score: 65 },
  { name: 'XGBoost Regressor',        winner: false, score: 85 },
  { name: 'Random Forest Regressor',  winner: true,  score: 100 },
];

export function AboutModelSection() {
  const sortedModels = [...MODELS].sort((a,b) => b.score - a.score);

  return (
    <section id="about" className="py-24 md:py-32 overflow-hidden bg-slate-50 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-6 font-bold shadow-sm">
            <Network className="h-4 w-4" /> Research Methodology
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Development Pipeline
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            The architecture follows a rigorous machine learning lifecycle, transitioning from raw data ingestion to a production-ready inference API.
          </p>
        </div>

        {/* Leaderboard */}
        <div className="mb-32">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Models Evaluated</h3>
            <p className="text-slate-500 text-lg">Cross-validated relative performance (CV MAE proxy)</p>
          </div>
          <div className="space-y-4 bg-white p-6 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
             {sortedModels.map((model, idx) => (
               <div key={model.name} className="relative h-16 md:h-20 rounded-2xl bg-slate-50 overflow-hidden flex items-center w-full group">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: `${model.score}%` }}
                   viewport={{ once: true }}
                   transition={{ duration: 1.2, delay: 0.1 * idx, ease: 'easeOut' }}
                   className={`absolute top-0 left-0 h-full ${model.winner ? 'bg-primary' : 'bg-slate-200'}`}
                 />
                 <div className="relative z-10 w-full flex justify-between items-center px-6 md:px-8 pointer-events-none">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                       <span className={`text-base md:text-lg font-bold ${model.winner ? 'text-white drop-shadow-md' : 'text-slate-700'}`}>
                         {model.name}
                       </span>
                       {model.winner && (
                         <span className="bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-white/20 shadow-sm flex items-center gap-1.5 w-max">
                           <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                         </span>
                       )}
                    </div>
                    <span className={`font-mono text-xl md:text-2xl font-bold ${model.winner ? 'text-white drop-shadow-md' : 'text-slate-500'}`}>
                      {model.score}
                    </span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Phase Grid */}
        <div>
          <div className="mb-12 text-center md:text-left">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Execution Sequence</h3>
            <p className="text-slate-500 text-lg">A 10-phase systematic progression.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
            {WORKFLOW_STEPS.map((step, idx) => {
              const opacity = 0.2 + (idx / 9) * 0.8; 
              const isEven = idx % 2 === 0;
              
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: (idx % 2) * 0.1 }}
                  className={`relative flex flex-col p-8 md:p-10 bg-white border border-slate-100 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${!isEven ? 'md:mt-24' : ''}`}
                >
                   <div 
                     className="absolute left-0 top-10 bottom-10 w-2 rounded-r-full bg-primary"
                     style={{ opacity }}
                   />
                   <div className="text-[5rem] md:text-8xl font-black text-primary/10 mb-2 md:mb-4 font-mono tracking-tighter leading-none">
                      {step.num.toString().padStart(2, '0')}
                   </div>
                   <h4 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h4>
                   <p className="text-slate-600 leading-relaxed text-lg">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
