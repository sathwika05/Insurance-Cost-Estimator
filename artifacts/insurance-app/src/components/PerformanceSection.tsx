import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  note?: string;
}

function MetricCard({ label, value, description, note }: MetricCardProps) {
  return (
    <Card className="shadow-sm text-center">
      <CardContent className="pt-6 pb-5 px-6">
        <p className="mb-2 text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold font-mono tracking-tight text-primary">
          {value}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        {note && <p className="mt-1 text-xs italic text-muted-foreground/70">{note}</p>}
      </CardContent>
    </Card>
  );
}

// CV results from model selection (5-fold cross-validation on training set)
const MODELS_TABLE = [
  {
    name: 'Linear Regression',
    mae: '4,221.96',
    rmse: '6,123.65',
    r2: '0.723',
    status: 'Baseline',
  },
  {
    name: 'Ridge Regression',
    mae: '4,226.80',
    rmse: '6,123.65',
    r2: '0.723',
    status: 'Evaluated',
  },
  {
    name: 'Lasso Regression',
    mae: '4,222.00',
    rmse: '6,123.43',
    r2: '0.723',
    status: 'Evaluated',
  },
  {
    name: 'Decision Tree',
    mae: '3,284.18',
    rmse: '6,777.52',
    r2: '0.659',
    status: 'Evaluated',
  },
  {
    name: 'Random Forest',
    mae: '2,742.90',
    rmse: '4,894.45',
    r2: '0.821',
    status: 'Final Model',
  },
  {
    name: 'XGBoost',
    mae: '3,104.85',
    rmse: '5,375.65',
    r2: '0.785',
    status: 'Evaluated',
  },
];

const STATUS_COLORS: Record<string, string> = {
  Baseline: 'bg-muted text-muted-foreground',
  Evaluated: 'bg-muted text-muted-foreground',
  'Final Model': 'bg-primary/10 text-primary font-semibold',
};

export function PerformanceSection() {
  return (
    <section id="performance" className="py-20 bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            Model Performance
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground">
            Final metrics for the tuned Random Forest model on the held-out test set —
            data the model never saw during training or hyperparameter tuning.
          </p>
        </div>

        {/* Final model metric cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Mean Absolute Error (MAE)"
            value="$1,960.70"
            description="Average absolute difference between predicted and actual charges"
            note="Lower is better"
          />
          <MetricCard
            label="Root Mean Squared Error (RMSE)"
            value="$4,283.83"
            description="Square root of the average squared prediction errors"
            note="Lower is better — penalises large errors more"
          />
          <MetricCard
            label="R² Score"
            value="0.900"
            description="Proportion of variance in charges explained by the model"
            note="Closer to 1.0 is better"
          />
        </div>

        {/* Model comparison table */}
        <Card className="shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-base">Model Comparison</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              5-fold cross-validation results on the training set. Random Forest had the best CV MAE
              and was selected for hyperparameter tuning.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">Model</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">MAE</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">RMSE</th>
                    <th className="px-4 py-3 text-right font-semibold text-foreground">R²</th>
                    <th className="px-4 py-3 text-center font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MODELS_TABLE.map((row, i) => (
                    <tr
                      key={row.name}
                      className={`border-b border-border last:border-0 transition-colors hover:bg-muted/30 ${
                        row.status === 'Final Model' ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                      <td className="px-4 py-3 text-right font-mono text-muted-foreground">{row.mae}</td>
                      <td className="px-4 py-3 text-right font-mono text-muted-foreground">{row.rmse}</td>
                      <td className="px-4 py-3 text-right font-mono text-muted-foreground">{row.r2}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs ${
                            STATUS_COLORS[row.status]
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground italic">
          CV MAE shown for all models. Final model (tuned Random Forest) achieved test MAE $1,960.70 and R² 0.900.
        </p>
      </div>
    </section>
  );
}
