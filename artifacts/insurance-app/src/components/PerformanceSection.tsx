import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  note?: string;
  gradient: string;
  delay: number;
}

function MetricCard({ label, value, description, note, gradient, delay }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={`relative overflow-hidden border-0 shadow-2xl h-full ${gradient}`}>
        <div className="absolute inset-0 bg-black/40 mix-blend-overlay pointer-events-none" />
        <CardContent className="pt-8 pb-8 px-8 relative z-10 h-full flex flex-col justify-between">
          <div>
            <p className="mb-4 text-xs font-mono uppercase tracking-widest text-white/70">{label}</p>
            <p className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-white mb-6 drop-shadow-sm">
              {value}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/80 leading-snug">{description}</p>
            {note && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/20 text-[10px] font-mono uppercase text-white/60">
                <ArrowUpRight className="h-3 w-3" /> {note}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const MODELS_TABLE = [
  { name: 'Linear Regression', mae: '4,221.96', rmse: '6,123.65', r2: '0.723', status: 'Baseline' },
  { name: 'Ridge Regression', mae: '4,226.80', rmse: '6,123.65', r2: '0.723', status: 'Evaluated' },
  { name: 'Lasso Regression', mae: '4,222.00', rmse: '6,123.43', r2: '0.723', status: 'Evaluated' },
  { name: 'Decision Tree', mae: '3,284.18', rmse: '6,777.52', r2: '0.659', status: 'Evaluated' },
  { name: 'XGBoost', mae: '3,104.85', rmse: '5,375.65', r2: '0.785', status: 'Evaluated' },
  { name: 'Random Forest', mae: '2,742.90', rmse: '4,894.45', r2: '0.821', status: 'Final Model' },
];

const CHART_DATA = [
  { name: 'Linear', value: 4221.96 },
  { name: 'Ridge', value: 4226.80 },
  { name: 'Lasso', value: 4222.00 },
  { name: 'Tree', value: 3284.18 },
  { name: 'XGB', value: 3104.85 },
  { name: 'Forest', value: 2742.90 },
];

export function PerformanceSection() {
  return (
    <motion.section 
      id="performance" 
      className="py-16 md:py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:text-left md:flex justify-between items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Performance Metrics
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Evaluation results on the held-out test split. The Random Forest ensemble demonstrates robust predictive capability with high variance explanation.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
            <Target className="h-4 w-4" /> Final Evaluation
          </div>
        </div>

        {/* Metric cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <MetricCard
            label="Mean Absolute Error"
            value="$1,960"
            description="Average absolute deviation between predictions and actual charges."
            note="Primary minimization target"
            gradient="bg-gradient-to-br from-teal-900 to-slate-900"
            delay={0.1}
          />
          <MetricCard
            label="Root Mean Squared Error"
            value="$4,283"
            description="Square root of average squared errors, heavily penalizing large deviations."
            note="Outlier sensitivity"
            gradient="bg-gradient-to-br from-slate-800 to-slate-950"
            delay={0.2}
          />
          <MetricCard
            label="R² Variance Score"
            value="0.900"
            description="Proportion of variance in medical charges explained by the independent variables."
            note="Scale 0.0 - 1.0"
            gradient="bg-gradient-to-br from-indigo-950 to-slate-900"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chart */}
          <div className="lg:col-span-5">
            <Card className="bg-card border-white/5 shadow-xl h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-widest font-mono text-muted-foreground flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-primary" /> Cross-Validation MAE
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#ffffff40" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis 
                      stroke="#ffffff40" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(val) => `$${val/1000}k`}
                    />
                    <Tooltip 
                      cursor={{fill: '#ffffff05'}}
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'MAE']}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.name === 'Forest' ? '#14b8a6' : '#334155'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <div className="lg:col-span-7">
            <Card className="bg-card border-white/5 shadow-xl h-full">
              <CardContent className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-black/20">
                        <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">Model Architecture</th>
                        <th className="px-6 py-4 text-right font-mono text-xs uppercase tracking-widest text-muted-foreground">MAE ($)</th>
                        <th className="px-6 py-4 text-right font-mono text-xs uppercase tracking-widest text-muted-foreground">RMSE ($)</th>
                        <th className="px-6 py-4 text-right font-mono text-xs uppercase tracking-widest text-muted-foreground">R²</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {MODELS_TABLE.map((row, i) => {
                        const isWinner = row.status === 'Final Model';
                        return (
                          <motion.tr
                            key={row.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.05) }}
                            className={`group transition-colors ${
                              isWinner 
                                ? 'bg-primary/5 border-l-2 border-l-primary' 
                                : 'hover:bg-white/[0.02] border-l-2 border-l-transparent'
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <span className={`font-medium ${isWinner ? 'text-primary' : 'text-foreground/90'}`}>
                                  {row.name}
                                </span>
                                {isWinner && (
                                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                                )}
                              </div>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-right font-mono ${isWinner ? 'text-primary' : 'text-muted-foreground'}`}>
                              {row.mae}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-muted-foreground/70">
                              {row.rmse}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-muted-foreground/70">
                              {row.r2}
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.section>
  );
}