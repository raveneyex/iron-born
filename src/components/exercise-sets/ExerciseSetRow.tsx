import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const SetInputSchema = z.object({
  reps: z.number().min(1, { message: 'Reps must be at least 1' }).optional(),
  weight: z.number().min(1, { message: 'Weight must be at least 1' }).optional(),
  units: z.enum(['kg', 'lbs']).optional(),
  completed: z.boolean().optional(),
});

type SetInput = z.infer<typeof SetInputSchema>;

export function ExerciseSetRow() {
  const form = useForm<SetInput>({
    resolver: zodResolver(SetInputSchema),
    mode: 'onChange',
    defaultValues: {
      reps: 3,
      weight: 10,
      units: 'kg',
      completed: false,
    },
  });

  const handleNumericInputChange = (value: string, field: keyof SetInput) => {
    const parsedValue = parseInt(value, 10);
    form.setValue(field, parsedValue);
  };

  const handleUnitsChange = (value: string) => {
    form.setValue('units', value as 'kg' | 'lbs');
  };

  const handleCompletedSet = (data: SetInput) => {
    console.log(data);
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
            <FormItem className="contents">
              <FormLabel className="hidden">Weight</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Weight"
                  className="w-20"
                  {...field}
                  onChange={(e) => handleNumericInputChange(e.target.value, 'weight')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="units"
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
