import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

const R2_DATA = [{ name: 'R²', value: 90, fill: '#0d9488' }];

const CHART_DATA = [
  { name: 'Linear', value: 4221.96 },
  { name: 'Ridge',  value: 4226.80 },
  { name: 'Lasso',  value: 4222.00 },
  { name: 'Tree',   value: 3284.18 },
  { name: 'XGB',    value: 3104.85 },
  { name: 'Forest', value: 2742.90 },
];

const MODELS_TABLE = [
  { name: 'Linear Regression', mae: '$4,221.96', rmse: '$6,123.65', r2: '0.723', status: 'Baseline' },
  { name: 'Ridge Regression',  mae: '$4,226.80', rmse: '$6,123.65', r2: '0.723', status: 'Evaluated' },
  { name: 'Lasso Regression',  mae: '$4,222.00', rmse: '$6,123.43', r2: '0.723', status: 'Evaluated' },
  { name: 'Decision Tree',     mae: '$3,284.18', rmse: '$6,777.52', r2: '0.659', status: 'Evaluated' },
  { name: 'XGBoost',           mae: '$3,104.85', rmse: '$5,375.65', r2: '0.785', status: 'Evaluated' },
  { name: 'Random Forest',     mae: '$2,742.90', rmse: '$4,894.45', r2: '0.821', status: 'Final Model' },
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

        {/* Top row — R² gauge + 2 KPI tiles + bar chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">

          {/* R² Gauge */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-white border-border shadow-lg h-full flex flex-col items-center justify-center py-8 px-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">R² Score</p>
              <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="100%"
                    startAngle={220}
                    endAngle={-40}
                    data={R2_DATA}
                    barSize={12}
                  >
                    <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#e2e8f0' }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-primary font-mono">0.900</span>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wide mt-0.5">Variance</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 text-center mt-4 leading-snug">
                90% of insurance cost variation is explained by the model
              </p>
            </Card>
          </motion.div>

          {/* MAE + RMSE stacked */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {[
              {
                label: 'Mean Absolute Error',
                value: '$1,960',
                unit: 'USD',
                note: 'Avg. absolute deviation from actual charges',
                color: 'border-t-primary',
                textColor: 'text-primary',
                delay: 0.2,
              },
              {
                label: 'Root Mean Squared Error',
                value: '$4,283',
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

          {/* MAE bar chart */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white border-border shadow-lg h-full flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-primary" /> Cross-Validation MAE by Model
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                    <Tooltip
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                      formatter={(value: number) => [value.toLocaleString(), 'MAE']}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {CHART_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.name === 'Forest' ? '#0d9488' : '#cbd5e1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
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
