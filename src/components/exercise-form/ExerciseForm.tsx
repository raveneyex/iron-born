import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface ExerciseFormProps {
  className?: string;
}

const ExerciseInputSchema = z.object({
  name: z.string().min(5, { message: 'Name must be at least 5 characters long' }),
  sets: z.number().min(1, { message: 'Sets must be at least 1' }),
  reps: z.number().min(1, { message: 'Reps must be at least 1' }),
  weight: z.number().min(1, { message: 'Weight must be at least 1' }).optional(),
  categories: z.array(z.string()).optional(),
});

type ExerciseInput = z.infer<typeof ExerciseInputSchema>;

export function ExerciseForm(props: ExerciseFormProps) {
  const { className } = props;

  const form = useForm<ExerciseInput>({
    resolver: zodResolver(ExerciseInputSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      sets: 4,
      reps: 8,
      weight: 1,
    },
  });

  const isFormDisabled = !form.formState.isDirty || !form.formState.isValid;

  const onSubmit = (data: ExerciseInput) => {
    console.log(data);
    form.reset();
  };

  return (
    <Card className="sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-md">Add a new exercise</CardTitle>
        <CardDescription className="text-sm">Fields marked with (*) are mandatory.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-8', className)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Name (*)</FormLabel>
                  <FormControl>
                    <Input placeholder="Exercise Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sets (*)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Sets" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reps (*)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Reps" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Weight" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isFormDisabled}>
              Add Exercise
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
