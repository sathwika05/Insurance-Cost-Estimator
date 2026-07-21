import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Target } from 'lucide-react';

const FEATURES = [
  {
    name: 'Age',
    type: 'Numerical',
    desc: 'Age of the primary insurance beneficiary (18–64).',
    color: 'bg-blue-50 border-blue-100 text-blue-700',
    dot: 'bg-blue-400',
  },
  {
    name: 'Sex',
    type: 'Categorical',
    desc: 'Biological sex of the beneficiary: male or female.',
    color: 'bg-purple-50 border-purple-100 text-purple-700',
    dot: 'bg-purple-400',
  },
  {
    name: 'BMI',
    type: 'Numerical',
    desc: 'Body mass index — a ratio of weight to height squared.',
    color: 'bg-blue-50 border-blue-100 text-blue-700',
    dot: 'bg-blue-400',
  },
  {
    name: 'Children',
    type: 'Numerical',
    desc: 'Number of dependents covered by the insurance policy (0–5).',
    color: 'bg-blue-50 border-blue-100 text-blue-700',
    dot: 'bg-blue-400',
  },
  {
    name: 'Smoker',
    type: 'Categorical',
    desc: 'Whether the beneficiary is a tobacco smoker: yes or no.',
    color: 'bg-purple-50 border-purple-100 text-purple-700',
    dot: 'bg-purple-400',
  },
  {
    name: 'Region',
    type: 'Categorical',
    desc: 'US geographic region: northeast, northwest, southeast, or southwest.',
    color: 'bg-purple-50 border-purple-100 text-purple-700',
    dot: 'bg-purple-400',
  },
];

const EDA_INSIGHTS = [
  'The dataset contains both numerical and categorical variables.',
  'No missing values were detected across any feature or the target column.',
  'Insurance charges are strongly right-skewed — most patients incur moderate costs while a minority incur very high costs.',
  'Smoking status has the strongest relationship with insurance charges.',
  'Age and BMI show moderate positive relationships with charges.',
  'No severe multicollinearity was detected among numerical features.',
  'High-cost outliers were retained because they represent realistic medical cases, not data errors.',
];

const PREPROCESSING = [
  'One-hot encoding for all categorical variables (sex, smoker, region)',
  'Feature scaling applied for linear and regularised models (StandardScaler)',
  'Scikit-learn Pipeline and ColumnTransformer for reproducible transformations',
  'Log transformation of the target variable to reduce skew and improve model fit',
  'No aggressive outlier removal — realistic extreme values preserved',
  'Held-out test set created before any modelling to prevent data leakage',
];

export function DatasetSection() {
  return (
    <section id="dataset" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            Dataset and EDA Insights
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            The model was trained on the Medical Cost Personal Dataset — a widely-used benchmark
            with 1,338 patient records and six predictor variables.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mb-6">
          <h3 className="mb-4 text-base font-semibold text-foreground">Dataset Features</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.name} className="shadow-xs">
                <CardContent className="pt-4 pb-4 px-4">
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${f.dot}`} />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">{f.name}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${f.color}`}
                        >
                          {f.type}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Target variable */}
        <Card className="mb-10 border-primary/30 bg-primary/5 shadow-xs">
          <CardContent className="flex items-center gap-4 py-4 px-5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
              <Target className="h-5 w-5 text-primary" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Target: Medical Insurance Charges</p>
              <p className="text-xs text-muted-foreground">
                Continuous numerical variable — annual insurance cost in USD.&nbsp;
                <span className="font-medium text-foreground">Problem Type: Regression</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* EDA + Preprocessing side by side */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* EDA insights */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Key EDA Findings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {EDA_INSIGHTS.map((insight, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">{insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preprocessing strategy */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Preprocessing Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {PREPROCESSING.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
