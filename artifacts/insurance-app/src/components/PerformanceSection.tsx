import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// ── TODO: Replace placeholder values below with your actual model metrics ─────
// After running your final evaluation (notebook Step 9), paste the real numbers here.

interface MetricCardProps {
  label: string;
  value: string;       // TODO: replace with your actual value, e.g. "2341.50"
  description: string;
  note?: string;
}

function MetricCard({ label, value, description, note }: MetricCardProps) {
  const isPlaceholder = value.startsWith('Add ');
  return (
    <Card className="shadow-sm text-center">
      <CardContent className="pt-6 pb-5 px-6">
        <p className="mb-2 text-sm font-medium text-muted-foreground">{label}</p>
        <p
          className={`text-3xl font-bold font-mono tracking-tight ${
            isPlaceholder ? 'text-muted-foreground/50 text-xl' : 'text-primary'
          }`}
        >
          {value}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        {note && <p className="mt-1 text-xs italic text-muted-foreground/70">{note}</p>}
      </CardContent>
    </Card>
  );
}

// ── TODO: Replace placeholder cells in MODELS_TABLE with your CV & test results
const MODELS_TABLE = [
  {
    name: 'Linear Regression',
    mae: '— Add MAE',    // TODO
    rmse: '— Add RMSE',  // TODO
    r2: '— Add R²',      // TODO
    status: 'Baseline',
    statusVariant: 'secondary' as const,
  },
  {
    name: 'Ridge Regression',
    mae: '— Add MAE',
    rmse: '— Add RMSE',
    r2: '— Add R²',
    status: 'Evaluated',
    statusVariant: 'secondary' as const,
  },
  {
    name: 'Lasso Regression',
    mae: '— Add MAE',
    rmse: '— Add RMSE',
    r2: '— Add R²',
    status: 'Evaluated',
    statusVariant: 'secondary' as const,
  },
  {
    name: 'Decision Tree',
    mae: '— Add MAE',
    rmse: '— Add RMSE',
    r2: '— Add R²',
    status: 'Evaluated',
    statusVariant: 'secondary' as const,
  },
  {
    name: 'Random Forest',
    mae: '— Add MAE',
    rmse: '— Add RMSE',
    r2: '— Add R²',
    status: 'Evaluated',
    statusVariant: 'secondary' as const,
  },
  {
    name: 'XGBoost',
    mae: '— Add MAE',    // TODO: This is your final model — paste the tuned test MAE here
    rmse: '— Add RMSE',  // TODO: paste the tuned test RMSE here
    r2: '— Add R²',      // TODO: paste the tuned test R² here
    status: 'Final Model',
    statusVariant: 'default' as const,
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
            Metrics are evaluated on a held-out test set the model never saw during training or tuning.
            Replace the placeholder values below with your actual results.
          </p>
        </div>

        {/* Final model metric cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Mean Absolute Error (MAE)"
            value="Add final MAE"  // TODO: e.g. "$2,341.50"
            description="Average absolute difference between predicted and actual charges"
            note="Lower is better"
          />
          <MetricCard
            label="Root Mean Squared Error (RMSE)"
            value="Add final RMSE"  // TODO: e.g. "$4,218.70"
            description="Square root of the average squared prediction errors"
            note="Lower is better — penalises large errors more"
          />
          <MetricCard
            label="R² Score"
            value="Add final R²"  // TODO: e.g. "0.89"
            description="Proportion of variance in charges explained by the model"
            note="Closer to 1.0 is better"
          />
        </div>

        {/* Model comparison table */}
        <Card className="shadow-sm overflow-hidden">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="text-base">Model Comparison</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Cross-validation results for all candidate models evaluated during model selection.
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
          {/* TODO: Replace placeholder metric cells above with values from your notebook's final evaluation step. */}
          Placeholder values shown — add real metrics from your notebook's final evaluation step.
        </p>
      </div>
    </section>
  );
}
