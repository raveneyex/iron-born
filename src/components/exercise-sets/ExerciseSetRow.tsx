import { useAppDispatch } from '@/redux/hooks';
import { completeSet } from '@/redux/slices/exercisesSlice';
import { ExerciseSet, ExerciseSetSchema, WeightUnits } from '@/types/exercise';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ExerciseSetRowProps {
  exerciseId: string;
}

export function ExerciseSetRow(props: ExerciseSetRowProps) {
  const { exerciseId } = props;
  const dispatch = useAppDispatch();

  const form = useForm<ExerciseSet>({
    resolver: zodResolver(ExerciseSetSchema),
    mode: 'onChange',
    defaultValues: {
      reps: 3,
      weight: {
        weight: 10,
        units: 'kg',
      },
    },
  });

  const handleWeightChange = (value: string) => {
    form.setValue('weight.weight', parseInt(value, 10));
  };

  const handleRepsChange = (value: string) => {
    form.setValue('reps', parseInt(value, 10));
  };

  const handleUnitsChange = (value: string) => {
    form.setValue('weight.units', value as WeightUnits);
  };

  const handleCompletedSet = (data: ExerciseSet) => {
    dispatch(completeSet({ id: exerciseId, data }));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCompletedSet)} className="contents">
        <FormField
          control={form.control}
          name="reps"
          render={({ field }) => (
            <FormItem className="contents">
              <FormLabel className="hidden">Reps</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Reps"
                  className="w-20"
                  {...field}
                  onChange={(e) => handleRepsChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight.weight"
          render={({ field }) => (
            <FormItem className="contents">
              <FormLabel className="hidden">Weight</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Weight"
                  className="w-20"
                  {...field}
                  onChange={(e) => handleWeightChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight.units"
          render={({ field }) => (
            <FormItem className="contents">
              <FormLabel className="hidden">Units</FormLabel>
              <Select onValueChange={handleUnitsChange} defaultValue={field.value}>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="Weight Units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lbs">lbs</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="icon" className="justify-self-center">
          <CheckIcon className="w-4 h-4" />
        </Button>
      </form>
    </Form>
  );
}
