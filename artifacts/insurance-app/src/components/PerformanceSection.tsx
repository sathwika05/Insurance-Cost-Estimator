import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from 'recharts';

const RADAR_DATA = [
  { metric: 'MAE',        Linear: 48, Ridge: 48, Lasso: 48, Tree: 69, XGBoost: 73, Forest: 100 },
  { metric: 'RMSE',       Linear: 55, Ridge: 55, Lasso: 55, Tree: 40, XGBoost: 66, Forest: 80  },
  { metric: 'R²',         Linear: 72, Ridge: 72, Lasso: 72, Tree: 66, XGBoost: 79, Forest: 90  },
  { metric: 'Stability',  Linear: 90, Ridge: 92, Lasso: 91, Tree: 55, XGBoost: 78, Forest: 95  },
  { metric: 'Speed',      Linear: 99, Ridge: 99, Lasso: 99, Tree: 95, XGBoost: 60, Forest: 55  },
];

const R2_DATA = [{ name: 'R²', value: 90, fill: '#0d9488' }];

const MODELS_TABLE = [
  { name: 'Linear Regression', mae: '4,221.96', rmse: '6,123.65', r2: '0.723', status: 'Baseline' },
  { name: 'Ridge Regression',  mae: '4,226.80', rmse: '6,123.65', r2: '0.723', status: 'Evaluated' },
  { name: 'Lasso Regression',  mae: '4,222.00', rmse: '6,123.43', r2: '0.723', status: 'Evaluated' },
  { name: 'Decision Tree',     mae: '3,284.18', rmse: '6,777.52', r2: '0.659', status: 'Evaluated' },
  { name: 'XGBoost',           mae: '3,104.85', rmse: '5,375.65', r2: '0.785', status: 'Evaluated' },
  { name: 'Random Forest',     mae: '2,742.90', rmse: '4,894.45', r2: '0.821', status: 'Final Model' },
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

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
              Performance Metrics
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Evaluation results on the held-out test split. The Random Forest ensemble demonstrates robust predictive capability with high variance explanation.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-lg border border-primary/20 shrink-0">
            <Target className="h-4 w-4" /> Final Evaluation
          </div>
        </div>

        {/* Top row — R² gauge + 2 KPI tiles + radar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

          {/* R² Gauge */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-white border-border shadow-lg h-full flex flex-col items-center justify-center py-8 px-4">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">R² Score</p>
              <div className="relative w-40 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    startAngle={220}
                    endAngle={-40}
                    data={R2_DATA}
                    barSize={14}
                  >
                    <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#e2e8f0' }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-primary font-mono">0.900</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">Variance</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center mt-4 leading-snug">
                90% of insurance cost variation is explained by the model
              </p>
            </Card>
          </motion.div>

          {/* MAE + RMSE stacked */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {[
              {
                label: 'Mean Absolute Error',
                value: '1,960',
                unit: 'USD',
                note: 'Avg. absolute deviation from actual charges',
                color: 'border-t-primary',
                textColor: 'text-primary',
                delay: 0.2,
              },
              {
                label: 'Root Mean Squared Error',
                value: '4,283',
                unit: 'USD',
                note: 'Penalises large outlier predictions more heavily',
                color: 'border-t-indigo-500',
                textColor: 'text-indigo-600',
                delay: 0.3,
              },
            ].map((m) => (
              <motion.div
                key={m.label}
                className="flex-1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: m.delay }}
              >
                <Card className={`bg-white shadow-lg border-t-4 ${m.color} h-full`}>
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">{m.label}</p>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className={`text-4xl font-bold font-mono tracking-tighter ${m.textColor}`}>
                        {m.value}
                      </span>
                      <span className="text-xs font-mono text-slate-400 uppercase">{m.unit}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{m.note}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Radar chart */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white border-border shadow-lg h-full">
              <CardHeader className="pb-0">
                <CardTitle className="text-sm font-mono uppercase tracking-widest text-slate-500">
                  Model Comparison — Normalised Score (0–100)
                </CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={RADAR_DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Radar name="Random Forest" dataKey="Forest" stroke="#0d9488" fill="#0d9488" fillOpacity={0.25} strokeWidth={2} />
                    <Radar name="XGBoost" dataKey="XGBoost" stroke="#818cf8" fill="#818cf8" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
                    <Radar name="Linear" dataKey="Linear" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.08} strokeWidth={1} strokeDasharray="2 3" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                {/* Legend */}
                <div className="flex items-center justify-center gap-6 -mt-2">
                  {[
                    { label: 'Random Forest', color: '#0d9488' },
                    { label: 'XGBoost',       color: '#818cf8' },
                    { label: 'Linear',        color: '#94a3b8' },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <span className="inline-block h-2 w-5 rounded-sm" style={{ backgroundColor: l.color }} />
                      <span className="text-[10px] font-mono text-slate-500">{l.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white border-border shadow-lg">
            <CardContent className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-widest text-slate-500">Model</th>
                      <th className="px-6 py-4 text-right font-mono text-xs uppercase tracking-widest text-slate-500">MAE</th>
                      <th className="px-6 py-4 text-right font-mono text-xs uppercase tracking-widest text-slate-500">RMSE</th>
                      <th className="px-6 py-4 text-right font-mono text-xs uppercase tracking-widest text-slate-500">R²</th>
                      <th className="px-6 py-4 text-right font-mono text-xs uppercase tracking-widest text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MODELS_TABLE.map((row, i) => {
                      const isWinner = row.status === 'Final Model';
                      return (
                        <motion.tr
                          key={row.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className={`transition-colors ${
                            isWinner
                              ? 'bg-primary/5 border-l-4 border-l-primary'
                              : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                          }`}
                        >
                          <td className="px-6 py-3 whitespace-nowrap">
                            <span className={`font-medium ${isWinner ? 'text-primary' : 'text-slate-700'}`}>
                              {row.name}
                            </span>
                          </td>
                          <td className={`px-6 py-3 whitespace-nowrap text-right font-mono text-sm ${isWinner ? 'text-primary font-bold' : 'text-slate-600'}`}>
                            {row.mae}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-right font-mono text-sm text-slate-500">
                            {row.rmse}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-right font-mono text-sm text-slate-500">
                            {row.r2}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-right">
                            <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded ${
                              isWinner
                                ? 'bg-primary/10 text-primary font-bold'
                                : row.status === 'Baseline'
                                ? 'bg-slate-100 text-slate-500'
                                : 'text-slate-400'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
