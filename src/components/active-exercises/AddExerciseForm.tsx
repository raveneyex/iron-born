import { cn } from '@/lib/utils';
import { ExerciseInputData, ExerciseInputSchema, WeightUnits } from '@/types/exercise';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { WeightUnitsSelect } from '../weight-units-select/WeightUnitsSelect';

interface AddExerciseFormProps {
  className?: string;
  onSubmit: (data: ExerciseInputData) => void;
}

export function AddExerciseForm(props: AddExerciseFormProps) {
  const { className, onSubmit } = props;

  const form = useForm<ExerciseInputData>({
    resolver: zodResolver(ExerciseInputSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      totalSets: 4,
      weightUnits: 'kg',
    },
  });

  const handleTotalSetsChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    form.setValue('totalSets', parsedValue);
  };

  const handleUnitsChange = (value: string) => {
    form.setValue('weightUnits', value as WeightUnits);
  };

  const submitHandler = (data: ExerciseInputData) => {
    onSubmit(data);
    form.reset();
  };

  const isFormDisabled = !form.formState.isDirty || !form.formState.isValid;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className={cn('space-y-8 w-full max-w-sm md:max-w-md', className)}
        data-testid="add-exercise-form"
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
                  onChange={(e) => handleTotalSetsChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weightUnits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight Units</FormLabel>
              <FormControl>
                <WeightUnitsSelect
                  {...field}
                  weightUnits={field.value}
                  onChange={handleUnitsChange}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button name="submit" type="submit" className="w-full" disabled={isFormDisabled}>
          Add Exercise
        </Button>
      </form>
    </Form>
  );
}
