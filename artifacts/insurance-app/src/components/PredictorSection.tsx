import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePredictInsuranceCost } from '@workspace/api-client-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';

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

export function PredictorSection() {
  const [result, setResult] = useState<{
    estimated_annual_cost: number;
    currency: string;
  } | null>(null);
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const predictMutation = usePredictInsuranceCost();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      children: 0,
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
    reset();
    setResult(null);
    setSubmittedValues(null);
    setApiError(null);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row gap-8">
      {/* Left Column: Form (~55%) */}
      <div className="w-full md:w-[55%] flex flex-col gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-8 pt-8 pb-6 border-b border-slate-100">
            <h2 className="text-xl font-semibold text-slate-900">
              Patient Information
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Complete all fields to generate a cost estimate
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="p-8 flex flex-col gap-6">
              {/* Row 1: Age + Sex */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Age
                  </label>
                  <input
                    type="number"
                    {...register('age')}
                    placeholder="e.g. 35"
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow placeholder:text-slate-400"
                  />
                  {errors.age && <span className="text-xs text-red-500">{errors.age.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Sex
                  </label>
                  <select
                    {...register('sex')}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow appearance-none"
                  >
                    <option value="">Select sex...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.sex && <span className="text-xs text-red-500">{errors.sex.message}</span>}
                </div>
              </div>

              {/* Row 2: BMI + Children */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    BMI (Body Mass Index)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('bmi')}
                    placeholder="e.g. 24.5"
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow placeholder:text-slate-400"
                  />
                  {errors.bmi && <span className="text-xs text-red-500">{errors.bmi.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Number of Children
                  </label>
                  <input
                    type="number"
                    min="0"
                    {...register('children')}
                    placeholder="0"
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow placeholder:text-slate-400"
                  />
                  {errors.children && <span className="text-xs text-red-500">{errors.children.message}</span>}
                </div>
              </div>

              {/* Row 3: Smoker + Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Smoker
                  </label>
                  <select
                    {...register('smoker')}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow appearance-none"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.smoker && <span className="text-xs text-red-500">{errors.smoker.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                    Region
                  </label>
                  <select
                    {...register('region')}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0d9488]/50 focus:border-[#0d9488] transition-shadow appearance-none"
                  >
                    <option value="">Select region...</option>
                    <option value="northeast">Northeast</option>
                    <option value="northwest">Northwest</option>
                    <option value="southeast">Southeast</option>
                    <option value="southwest">Southwest</option>
                  </select>
                  {errors.region && <span className="text-xs text-red-500">{errors.region.message}</span>}
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 pt-4">
              <button
                type="submit"
                disabled={predictMutation.isPending}
                className="w-full bg-[#0d9488] hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d9488] flex items-center justify-center gap-2"
              >
                {predictMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Cost'
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Error Message */}
        <AnimatePresence>
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center justify-between"
            >
              <span className="text-sm font-medium">{apiError}</span>
              <button onClick={() => setApiError(null)} className="text-red-500 hover:text-red-700">
                <RefreshCw className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Result Panel (~45%) */}
      <div className="w-full md:w-[45%]">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-[104px]">
          {/* Top Border Indicator */}
          <div className="h-1 w-full bg-[#0d9488]"></div>

          <div className="p-8">
            <h3 className="text-xs uppercase tracking-wide font-semibold text-slate-500">
              Estimated Annual Cost
            </h3>
            <p className="text-sm text-slate-400 mb-6 mt-1">
              Based on your patient profile
            </p>

            <AnimatePresence mode="wait">
              {result && submittedValues && !apiError ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  <div className="mb-8">
                    <span className="text-5xl font-bold tracking-tight text-[#0d9488]">
                      {formatCurrency(result.estimated_annual_cost)}
                    </span>
                    <div className="text-xs text-slate-400 mt-2 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-teal-500/50"></span>
                       Currency: {result.currency}
                    </div>
                  </div>

                  {/* Subtle Grid Summary */}
                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-5 mb-8">
                    <h4 className="text-xs uppercase tracking-wide font-semibold text-slate-400 mb-4">
                      Profile Summary
                    </h4>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">Age</span>
                        <span className="font-medium text-slate-700 mt-0.5">{submittedValues.age}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">Sex</span>
                        <span className="font-medium text-slate-700 mt-0.5">{humanise('sex', submittedValues.sex)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">BMI</span>
                        <span className="font-medium text-slate-700 mt-0.5">{submittedValues.bmi}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">Children</span>
                        <span className="font-medium text-slate-700 mt-0.5">{submittedValues.children}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">Smoker</span>
                        <span className="font-medium text-slate-700 mt-0.5">{humanise('smoker', submittedValues.smoker)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs">Region</span>
                        <span className="font-medium text-slate-700 mt-0.5">{humanise('region', submittedValues.region)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-200 text-sm"
                  >
                    New Prediction
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                    <span className="text-slate-300 text-2xl font-serif italic">$</span>
                  </div>
                  <p className="text-slate-500 font-medium">No prediction generated</p>
                  <p className="text-sm text-slate-400 mt-1 max-w-[200px]">
                    Enter patient details and click Calculate Cost to see the estimate here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
