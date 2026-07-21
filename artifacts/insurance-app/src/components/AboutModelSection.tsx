import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network } from 'lucide-react';
import { motion } from 'framer-motion';

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
  return (
    <motion.section 
      id="about" 
      className="py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-6">
            <Network className="h-3.5 w-3.5" /> Research Methodology
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Development Pipeline
          </h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
            The architecture follows a rigorous machine learning lifecycle, transitioning from raw data ingestion to a production-ready inference API.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Models Evaluated (Left Col) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="sticky top-24 space-y-8">
              <Card className="bg-white border-border shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <CardHeader className="pb-6 border-b border-border relative z-10">
                  <CardTitle className="text-base font-semibold tracking-wide flex items-center gap-2 text-slate-900">
                    Candidate Architectures
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-1">Cross-validated relative performance (MAE proxy)</p>
                </CardHeader>
                <CardContent className="pt-6 relative z-10 space-y-5">
                  {MODELS.map((model, idx) => (
                    <div key={model.name} className="relative group">
                      <div className="flex justify-between items-end mb-2">
                        <span className={`text-sm font-medium ${model.winner ? 'text-primary' : 'text-slate-700'}`}>
                          {model.name}
                        </span>
                        {model.winner && (
                          <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest">
                            Selected
                          </span>
                        )}
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                        <motion.div 
                          className={`h-full rounded-full ${model.winner ? 'bg-primary' : 'bg-slate-300'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${model.score}%` }}
                          transition={{ duration: 1, delay: 0.2 + (idx * 0.1), ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-border shadow-none">
                <CardContent className="p-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Selection Criteria</h4>
                  <div className="space-y-4 text-sm text-slate-600">
                    <p>
                      Candidate models underwent <strong className="text-slate-900 font-medium">5-fold cross-validation</strong> to establish stable baseline metrics.
                    </p>
                    <p>
                      The Random Forest regressor demonstrated superior generalisation capability and was subsequently optimized via <strong className="text-slate-900 font-medium">GridSearchCV</strong> over a constrained hyperparameter space.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-border mt-6">
                    {['Cross-Validation', 'GridSearchCV', 'Held-out Test'].map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-white border-slate-200 text-xs font-mono text-slate-500">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Workflow Timeline (Right Col) */}
          <div className="lg:col-span-7">
            <h3 className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-8 pl-4">Execution Sequence</h3>
            <div className="relative pl-6 md:pl-8 space-y-10">
              {/* Connector line */}
              <div className="absolute left-[11px] md:left-[15px] top-4 bottom-4 w-px bg-slate-200" />
              
              {WORKFLOW_STEPS.map((step, i) => (
                <motion.div 
                  key={step.num} 
                  className="relative group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  {/* Step node */}
                  <div className="absolute -left-6 md:-left-8 top-1 flex h-6 w-6 items-center justify-center">
                    <div className={`absolute inset-0 rounded-full ${i === WORKFLOW_STEPS.length - 1 ? 'bg-primary/20 animate-pulse' : 'bg-white border border-primary'} transition-colors duration-300`} />
                    <div className={`relative h-2 w-2 rounded-full ${i === WORKFLOW_STEPS.length - 1 ? 'bg-primary' : 'bg-primary/50'} transition-all duration-300`} />
                  </div>
                  
                  {/* Step content */}
                  <div className="pl-6">
                    <Card className="bg-white border-border shadow-sm group-hover:shadow-md transition-shadow">
                      <CardContent className="p-4 md:p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-mono text-primary font-bold tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                            PHASE {step.num.toString().padStart(2, '0')}
                          </span>
                          <h4 className="text-base font-semibold text-slate-900 group-hover:text-primary transition-colors">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mt-2">
                          {step.desc}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
