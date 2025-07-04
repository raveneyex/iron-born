import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCheck, CheckIcon, TrashIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import type { ExerciseSet, ExerciseSetInputData, WeightUnits } from '@/types/exercise';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { WeightUnitsSelect } from '@/components/weight-units-select/WeightUnitsSelect';
import { useAppSelector } from '@/redux/hooks';
import { selectWeightUnits } from '@/redux/slices/exercisesSlice';
import { ExerciseSetSchema } from '@/types/exercise';

export interface ExerciseSetRowProps {
  exerciseId: string;
  set: ExerciseSet;
  onCompleteSet: (params: { exerciseId: string; setId: string; data: ExerciseSetInputData }) => void;
  onUncompleteSet: (params: { exerciseId: string; setId: string }) => void;
  onDeleteSet: (params: { exerciseId: string; setId: string; setIsCompleted: boolean }) => void;
  onUnitsChange: (params: { exerciseId: string; weightUnits: WeightUnits }) => void;
}

export function ExerciseSetRow(props: ExerciseSetRowProps) {
  const { exerciseId, set, onCompleteSet, onUncompleteSet, onDeleteSet, onUnitsChange } = props;

  const weightUnits = useAppSelector((state) => selectWeightUnits(state, exerciseId));

  const form = useForm<ExerciseSetInputData>({
    resolver: zodResolver(ExerciseSetSchema),
    mode: 'onChange',
    defaultValues: {
      reps: set.reps,
      weight: set.weight,
      completed: set.completed,
    },
  });

  const handleWeightChange = (value: string) => {
    form.setValue('weight', parseInt(value, 10));
  };

  const handleRepsChange = (value: string) => {
    form.setValue('reps', parseInt(value, 10));
  };

  const handleCompletedSet = (data: ExerciseSetInputData) => {
    if (set.completed) {
      onUncompleteSet({ exerciseId: exerciseId, setId: set.id });
    } else {
      onCompleteSet({ exerciseId: exerciseId, setId: set.id, data });
    }
  };

  const handleUnitsChange = (value: WeightUnits) => {
    onUnitsChange({ exerciseId: exerciseId, weightUnits: value });
  };

  const handleDeleteSet = () => {
    onDeleteSet({ exerciseId: exerciseId, setId: set.id, setIsCompleted: set.completed });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCompletedSet)}
        className="contents"
        data-testid={`exercise-${exerciseId}-set-row-${set.id}`}
      >
        <FormField
          control={form.control}
          name="reps"
          render={({ field }) => (
            <FormItem className="contents">
              <FormLabel className="sr-only">Reps</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Reps"
                  className="w-16 md:w-20"
                  {...field}
                  onChange={(e) => handleRepsChange(e.target.value)}
                  disabled={set.completed}
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
              <FormLabel className="sr-only">Weight</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Weight"
                  className="w-16 md:w-20"
                  {...field}
                  disabled={set.completed}
                  onChange={(e) => handleWeightChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="contents">
          <FormLabel className="sr-only">Weight Units</FormLabel>
          <WeightUnitsSelect weightUnits={weightUnits} onChange={handleUnitsChange} className="w-16 md:w-20" />
        </FormItem>

        <Button name="delete-set" type="button" size="icon" className="justify-self-center" onClick={handleDeleteSet}>
          <TrashIcon className="w-4 h-4" />
          <span className="sr-only">Delete Set</span>
        </Button>

        <Button name="complete-set" type="submit" size="icon" className="justify-self-center">
          {set.completed ? <CheckCheck className="w-4 h-4" /> : <CheckIcon className="w-4 h-4" />}
          <span className="sr-only">{set.completed ? 'Uncomplete Set' : 'Complete Set'}</span>
        </Button>
      </form>
    </Form>
  );
}
