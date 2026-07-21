import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePredictInsuranceCost } from '@workspace/api-client-react';
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
import { Loader2, AlertCircle, RefreshCw, Activity, TrendingUp } from 'lucide-react';

const formSchema = z.object({
  age: z.coerce.number().min(18, 'Age must be at least 18').max(100, 'Age must be at most 100'),
  sex: z.enum(['male', 'female'], { required_error: 'Please select a sex' }),
  bmi: z.coerce
    .number()
    .min(10, 'BMI must be at least 10')
    .max(70, 'BMI must be at most 70')
    .refine((val) => Number(val.toFixed(1)) === val || val.toString().split('.')[1]?.length <= 1, {
      message: 'BMI must have at most one decimal place',
    }),
  children: z.coerce.number().min(0, 'Children must be at least 0').max(10, 'Children must be at most 10'),
  smoker: z.enum(['yes', 'no'], { required_error: 'Please select smoker status' }),
  region: z.enum(['northeast', 'northwest', 'southeast', 'southwest'], {
    required_error: 'Please select a region',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [result, setResult] = useState<{ estimated_annual_cost: number; currency: string } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const predictMutation = usePredictInsuranceCost();

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
    predictMutation.mutate(
      { data: values },
      {
        onSuccess: (data) => {
          setResult(data);
        },
        onError: (error: any) => {
          const errorMessage =
            error?.body?.detail || error?.body?.error || error?.message || 'An unexpected error occurred';
          setApiError(errorMessage);
        },
      }
    );
  };

  const handleReset = () => {
    form.reset();
    setResult(null);
    setApiError(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <Activity className="h-8 w-8 text-primary" data-testid="icon-logo" />
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground" data-testid="text-title">
            Medical Insurance Cost Predictor
          </h1>
          <p className="text-base text-muted-foreground" data-testid="text-description">
            Enter patient details to estimate annual insurance costs using our machine learning model. This tool provides
            data-driven predictions based on key health and demographic factors.
          </p>
        </div>

        {/* Prediction Form */}
        <Card className="mb-6 shadow-md" data-testid="card-form">
          <CardHeader>
            <CardTitle className="text-xl">Patient Information</CardTitle>
            <CardDescription>Complete all fields to generate a cost estimate</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Age */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 35"
                            min={18}
                            max={100}
                            {...field}
                            value={field.value ?? ''}
                            data-testid="input-age"
                          />
                        </FormControl>
                        <FormMessage data-testid="error-age" />
                      </FormItem>
                    )}
                  />

                  {/* Sex */}
                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sex</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-sex">
                              <SelectValue placeholder="Select sex" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male" data-testid="option-sex-male">Male</SelectItem>
                            <SelectItem value="female" data-testid="option-sex-female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage data-testid="error-sex" />
                      </FormItem>
                    )}
                  />

                  {/* BMI */}
                  <FormField
                    control={form.control}
                    name="bmi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BMI (Body Mass Index)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 24.5"
                            step="0.1"
                            min={10}
                            max={70}
                            {...field}
                            value={field.value ?? ''}
                            data-testid="input-bmi"
                          />
                        </FormControl>
                        <FormMessage data-testid="error-bmi" />
                      </FormItem>
                    )}
                  />

                  {/* Children */}
                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Children</FormLabel>
                        <Select onValueChange={(val) => field.onChange(Number(val))} value={String(field.value)}>
                          <FormControl>
                            <SelectTrigger data-testid="select-children">
                              <SelectValue placeholder="Select number" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={String(num)} data-testid={`option-children-${num}`}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage data-testid="error-children" />
                      </FormItem>
                    )}
                  />

                  {/* Smoker */}
                  <FormField
                    control={form.control}
                    name="smoker"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoker</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-smoker">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="no" data-testid="option-smoker-no">No</SelectItem>
                            <SelectItem value="yes" data-testid="option-smoker-yes">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage data-testid="error-smoker" />
                      </FormItem>
                    )}
                  />

                  {/* Region */}
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-region">
                              <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="northeast" data-testid="option-region-northeast">Northeast</SelectItem>
                            <SelectItem value="northwest" data-testid="option-region-northwest">Northwest</SelectItem>
                            <SelectItem value="southeast" data-testid="option-region-southeast">Southeast</SelectItem>
                            <SelectItem value="southwest" data-testid="option-region-southwest">Southwest</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage data-testid="error-region" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={predictMutation.isPending}
                    className="flex-1"
                    data-testid="button-submit"
                  >
                    {predictMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Calculate Cost
                      </>
                    )}
                  </Button>
                  {(result || apiError) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      data-testid="button-reset"
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

        {/* Error Alert */}
        {apiError && (
          <Alert variant="destructive" className="mb-6" data-testid="alert-error">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Prediction Error</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        {/* Result Card */}
        {result && !apiError && (
          <Card className="mb-6 border-accent/20 bg-accent/5 shadow-lg" data-testid="card-result">
            <CardHeader>
              <CardTitle className="text-lg text-muted-foreground">Prediction Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Estimated Annual Insurance Cost</p>
                <p className="font-mono text-5xl font-bold tracking-tight text-accent" data-testid="text-result-cost">
                  {formatCurrency(result.estimated_annual_cost)}
                </p>
                <p className="text-xs text-muted-foreground" data-testid="text-result-currency">
                  Currency: {result.currency}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Disclaimer */}
        <Card className="border-muted-foreground/20 bg-muted/30" data-testid="card-disclaimer">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground" data-testid="text-disclaimer">
              This prediction is an educational estimate and is not an official insurance quote.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
