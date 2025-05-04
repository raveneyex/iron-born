import { cn } from '@/lib/utils';
import { ActiveExercise } from '@/types/exercise';
import { zodResolver } from '@hookform/resolvers/zod';
import { nanoid } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface AddExerciseFormProps {
  className?: string;
  onSubmit: (data: ActiveExercise) => void;
}

const ExerciseInputSchema = z.object({
  name: z.string().min(5, { message: 'Name must be at least 5 characters long' }),
  totalSets: z.number().min(1, { message: 'Sets must be at least 1' }),
  // reps: z.number().min(1, { message: 'Reps must be at least 1' }),
  // weight: z.number().min(1, { message: 'Weight must be at least 1' }).optional(),
});

type ExerciseInput = z.infer<typeof ExerciseInputSchema>;

export function AddExerciseForm(props: AddExerciseFormProps) {
  const { className, onSubmit } = props;

  const form = useForm<ExerciseInput>({
    resolver: zodResolver(ExerciseInputSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      totalSets: 4,
      // reps: 8,
      // weight: 1,
    },
  });

  const handleNumericInputChange = (value: string, field: keyof ExerciseInput) => {
    const parsedValue = parseInt(value, 10);
    form.setValue(field, parsedValue);
  };

  const isFormDisabled = !form.formState.isDirty || !form.formState.isValid;

  const submitHandler = (data: ExerciseInput) => {
    const newExercise: ActiveExercise = {
      ...data,
      status: 'active',
      currentSet: 0,
      id: nanoid(),
      sets: [],
    };
    onSubmit(newExercise);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className={cn('space-y-8 w-full max-w-sm md:max-w-md', className)}
      >
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
          name="totalSets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Sets (*)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Total Sets"
                  {...field}
                  onChange={(e) => handleNumericInputChange(e.target.value, 'totalSets')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="reps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reps (*)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Reps"
                  {...field}
                  onChange={(e) => handleNumericInputChange(e.target.value, 'reps')}
                />
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
                <Input
                  type="number"
                  placeholder="Weight"
                  {...field}
                  onChange={(e) => handleNumericInputChange(e.target.value, 'weight')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button type="submit" className="w-full" disabled={isFormDisabled}>
          Add Exercise
        </Button>
      </form>
    </Form>
  );
}
