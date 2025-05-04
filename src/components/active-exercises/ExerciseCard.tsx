import { useAppDispatch } from '@/redux/hooks';
import { completeExercise, completeSet } from '@/redux/slices/exercisesSlice';
import { ActiveExercise } from '@/types/exercise';
import { Label } from '@radix-ui/react-label';
import { toast } from 'sonner';
import { ExerciseSets } from '../exercise-sets/ExerciseSets';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';

interface ExerciseCardProps {
  exercise: ActiveExercise;
}

export function ExerciseCard(props: ExerciseCardProps) {
  const { exercise } = props;
  const completedExerciseCheckboxId = `${exercise.id}-completed`;

  const dispatch = useAppDispatch();

  const onCompleteSet = () => {
    dispatch(completeSet(exercise.id));
    if (exercise.currentSet === exercise.totalSets - 1) {
      onCompleteExercise(true);
    }
  };

  const onCompleteExercise = (checked: boolean) => {
    if (checked) {
      dispatch(completeExercise(exercise.id));
      toast.success(`${exercise.name} completed!`);
    }
  };

  // const setsProgress = (exercise.currentSet / exercise.totalSets) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <ExerciseSets exercise={exercise} />
      </CardContent>
      <CardFooter className="flex flex-col justify-between items-start gap-2">
        <Button onClick={onCompleteSet}>Complete Set</Button>
        <div className="flex items-center gap-2">
          <Checkbox id={completedExerciseCheckboxId} onCheckedChange={onCompleteExercise} />
          <Label htmlFor={completedExerciseCheckboxId}>Mark as completed</Label>
        </div>
      </CardFooter>
    </Card>
  );
}
