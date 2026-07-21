import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePredictInsuranceCost, useHealthCheck } from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Loader2,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  PlusCircle,
  ActivitySquare,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Form schema ────────────────────────────────────────────────────────────────
const formSchema = z.object({
  age: z.coerce
    .number({ invalid_type_error: 'Age is required' })
    .min(18, 'Age must be at least 18')
    .max(100, 'Age must be at most 100'),
  sex: z.enum(['male', 'female'], { required_error: 'Please select a sex' }),
  bmi: z.coerce
    .number({ invalid_type_error: 'BMI is required' })
    .min(10, 'BMI must be at least 10')
    .max(70, 'BMI must be at most 70'),
  children: z.coerce.number().min(0).max(10),
  smoker: z.enum(['yes', 'no'], { required_error: 'Please select smoker status' }),
  region: z.enum(['northeast', 'northwest', 'southeast', 'southwest'], {
    required_error: 'Please select a region',
  }),
});

type FormValues = z.infer<typeof formSchema>;

// ── Helper ────────────────────────────────────────────────────────────────────
function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function humanise(key: string, val: string | number) {
  if (key === 'sex') return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  if (key === 'smoker') return val === 'yes' ? 'Yes' : 'No';
  if (key === 'region') return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  return String(val);
}

// ── Component ─────────────────────────────────────────────────────────────────
export function PredictorSection() {
  const [result, setResult] = useState<{
    estimated_annual_cost: number;
    currency: string;
  } | null>(null);
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const predictMutation = usePredictInsuranceCost();
  const { data: health, isLoading: isHealthLoading } = useHealthCheck();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      sex: undefined,
      bmi: undefined,
      children: 0,
      smoker: undefined,
      region: undefined,
    },
  });

  const onSubmit = (values: FormValues) => {
    setApiError(null);
    setResult(null);
    setSubmittedValues(values);
    predictMutation.mutate(
      { data: values },
      {
        onSuccess: (data) => setResult(data),
        onError: (error: any) => {
          const msg =
            error?.body?.detail ||
            error?.body?.error ||
            error?.message ||
            'An unexpected error occurred. Please try again.';
          setApiError(msg);
        },
      },
    );
  };

  const handleReset = () => {
    form.reset();
    setResult(null);
    setSubmittedValues(null);
    setApiError(null);
  };

  return (
    <motion.section 
      id="predictor" 
      className="min-h-full pb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Hero Band ── */}
      <div className="relative overflow-hidden bg-white border-b border-border mb-10 pt-16 pb-12 shadow-sm border-t-4 border-t-primary">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <ActivitySquare className="h-5 w-5" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Inference <span className="text-primary font-light">Engine</span>
              </h1>
            </div>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
              Execute real-time predictions against our tuned Random Forest ensemble. 
              Input patient demographic and health factors to generate high-confidence premium estimations.
            </p>
          </div>
          
          <div className="flex items-center self-start md:self-auto bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            {isHealthLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin text-primary/70" />
                <span className="text-xs font-mono text-primary/70">CONNECTING...</span>
              </div>
            ) : health?.status === 'ok' ? (
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-xs font-mono font-medium tracking-widest text-primary uppercase">Model Ready</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
                <span className="text-xs font-mono font-medium tracking-widest text-destructive uppercase">Offline</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ── Form Column ── */}
          <div className="lg:col-span-12">
            <AnimatePresence mode="wait">
              {!result && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-lg border-border bg-white">
                    <CardHeader className="border-b border-border pb-6">
                      <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-900">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Patient Parameters
                      </CardTitle>
                      <CardDescription className="text-xs uppercase tracking-widest font-mono text-slate-500">
                        Input feature vector for model evaluation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-8">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
                          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                            {/* Age */}
                            <FormField
                              control={form.control}
                              name="age"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Age</FormLabel>
                                  <FormControl>
                                    <Input
                                      className="bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-primary h-11"
                                      type="number"
                                      placeholder="e.g. 35"
                                      min={18}
                                      max={100}
                                      {...field}
                                      value={field.value ?? ''}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />

                            {/* Sex */}
                            <FormField
                              control={form.control}
                              name="sex"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Biological Sex</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-primary h-11">
                                        <SelectValue placeholder="Select..." />
                                      </SelectTrigger>
                                    </FormControl>
                                      <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                      </SelectContent>
                                  </Select>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />

                            {/* BMI */}
                            <FormField
                              control={form.control}
                              name="bmi"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">BMI Value</FormLabel>
                                  <FormControl>
                                    <Input
                                      className="bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-primary h-11"
                                      type="number"
                                      placeholder="e.g. 24.5"
                                      step="0.1"
                                      min={10}
                                      max={70}
                                      {...field}
                                      value={field.value ?? ''}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />

                            {/* Children */}
                            <FormField
                              control={form.control}
                              name="children"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Dependents</FormLabel>
                                  <Select
                                    onValueChange={(val) => field.onChange(Number(val))}
                                    value={String(field.value ?? 0)}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-primary h-11">
                                        <SelectValue placeholder="Select..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <SelectItem key={num} value={String(num)}>
                                          {num}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />

                            {/* Smoker */}
                            <FormField
                              control={form.control}
                              name="smoker"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Tobacco Use</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-primary h-11">
                                        <SelectValue placeholder="Select..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="no">Non-Smoker</SelectItem>
                                      <SelectItem value="yes">Smoker</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />

                            {/* Region */}
                            <FormField
                              control={form.control}
                              name="region"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs font-mono uppercase tracking-wider text-muted-foreground">US Region</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-900 focus-visible:ring-primary h-11">
                                        <SelectValue placeholder="Select..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="northeast">Northeast</SelectItem>
                                      <SelectItem value="northwest">Northwest</SelectItem>
                                      <SelectItem value="southeast">Southeast</SelectItem>
                                      <SelectItem value="southwest">Southwest</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="flex gap-4 pt-4 border-t border-border">
                            <Button
                              type="submit"
                              disabled={predictMutation.isPending}
                              className="h-12 px-8 flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all font-bold text-sm tracking-wide"
                            >
                              {predictMutation.isPending ? (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-center gap-2"
                                >
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  EVALUATING MODEL...
                                </motion.div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  RUN PREDICTION <TrendingUp className="h-4 w-4 ml-1 opacity-70" />
                                </div>
                              )}
                            </Button>
                            {apiError && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                                className="h-12 border-slate-200 text-slate-700 hover:bg-slate-50"
                              >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reset
                              </Button>
                            )}
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Error alert ── */}
            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 backdrop-blur-md">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertTitle className="text-destructive font-semibold">Prediction Failed</AlertTitle>
                  <AlertDescription className="text-destructive/80 text-sm">{apiError}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* ── Result Card ── */}
            <AnimatePresence>
              {result && submittedValues && !apiError && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="space-y-6"
                >
                  <Card className="relative overflow-hidden border border-border border-t-4 border-t-primary shadow-lg bg-white">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
                    <CardHeader className="border-b border-slate-100 pb-4 relative z-10 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-xs uppercase tracking-widest text-primary font-mono">
                          Model Output
                        </CardTitle>
                        <p className="text-sm text-slate-700 font-semibold mt-1">Estimated Annual Charge</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[10px] font-mono text-primary font-semibold uppercase tracking-wider">Success</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-10 pb-12 relative z-10 text-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <h2 className="text-6xl md:text-7xl font-bold font-mono tracking-tighter text-teal-800 drop-shadow-sm">
                          {formatCurrency(result.estimated_annual_cost)}
                        </h2>
                        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                          <p className="text-xs font-mono text-slate-500 tracking-wider">
                            BASE CURRENCY: {result.currency}
                          </p>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>

                  <Card className="border border-primary/20 bg-primary/5">
                    <CardHeader className="pb-4 border-b border-primary/10">
                      <CardTitle className="text-xs font-mono uppercase tracking-widest text-primary/80">
                        Feature Vector Used
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {(
                          [
                            ['Age', submittedValues.age, 'YRS'],
                            ['Sex', humanise('sex', submittedValues.sex), ''],
                            ['BMI', submittedValues.bmi, ''],
                            ['Children', submittedValues.children, ''],
                            ['Smoker', humanise('smoker', submittedValues.smoker), ''],
                            ['Region', humanise('region', submittedValues.region), ''],
                          ] as [string, string | number, string][]
                        ).map(([label, value, unit], i) => (
                          <motion.div 
                            key={label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (i * 0.05) }}
                            className="bg-white p-4 rounded-xl border border-primary/10 shadow-sm"
                          >
                            <dt className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1">{label}</dt>
                            <dd className="text-sm font-semibold text-slate-900 flex items-baseline gap-1">
                              {value}
                              {unit && <span className="text-[10px] text-slate-400 font-mono">{unit}</span>}
                            </dd>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          className="h-11 px-8 rounded-full border-primary/20 bg-white hover:bg-primary/5 hover:text-primary transition-colors text-xs font-semibold tracking-wide uppercase text-slate-700"
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          New Evaluation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}