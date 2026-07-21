import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

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
  { name: 'Linear Regression',        winner: false },
  { name: 'Ridge Regression',         winner: false },
  { name: 'Lasso Regression',         winner: false },
  { name: 'Decision Tree Regressor',  winner: false },
  { name: 'XGBoost Regressor',        winner: false },
  { name: 'Random Forest Regressor',  winner: true  },
];

export function AboutModelSection() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            About the Machine Learning Model
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            The model was developed in Python following a structured machine learning workflow,
            from data exploration through hyperparameter tuning to final deployment.
          </p>
        </div>

        {/* Workflow steps */}
        <div className="mb-12">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Development Workflow</h3>
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-5 top-6 hidden h-[calc(100%-3rem)] w-px bg-border sm:block" />
            <div className="space-y-4">
              {WORKFLOW_STEPS.map((step, i) => (
                <div key={step.num} className="flex gap-4">
                  {/* Step circle */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold z-10 relative ${
                        i === WORKFLOW_STEPS.length - 1
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-card text-foreground'
                      }`}
                    >
                      {step.num}
                    </div>
                  </div>
                  {/* Content */}
                  <Card className="flex-1 shadow-xs">
                    <CardContent className="py-3 px-4">
                      <p className="text-sm font-semibold text-foreground">{step.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{step.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Models Evaluated */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Models Evaluated</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {MODELS.map((model) => (
                <div key={model.name} className="flex items-center gap-2.5">
                  <CheckCircle2
                    className={`h-4 w-4 flex-shrink-0 ${model.winner ? 'text-accent' : 'text-primary'}`}
                  />
                  <span className={`text-sm ${model.winner ? 'font-semibold text-foreground' : 'text-foreground'}`}>
                    {model.name}
                  </span>
                  {model.winner && (
                    <span className="ml-auto rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                      Selected
                    </span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Model Selection Approach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                All six models were evaluated using <strong className="text-foreground">5-fold cross-validation</strong> on
                the training set to ensure robust, unbiased performance estimates.
              </p>
              <p>
                The best-performing model was then tuned with <strong className="text-foreground">GridSearchCV</strong> before
                being retrained on the full training set and assessed on a <strong className="text-foreground">held-out test set</strong> it had never seen.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Cross-Validation', 'GridSearchCV', 'Held-out Test Set'].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
