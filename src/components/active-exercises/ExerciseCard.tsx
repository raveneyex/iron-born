import { useAppDispatch } from '@/redux/hooks';
import { completeExercise, completeSet } from '@/redux/slices/exercisesSlice';
import { ActiveExercise } from '@/types/exercise';
import { Label } from '@radix-ui/react-label';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';

interface ExerciseCardProps {
  exercise: ActiveExercise;
}

export function ExerciseCard(props: ExerciseCardProps) {
  const { exercise } = props;
  const completedExerciseCheckboxId = `${exercise.id}-completed`;

  const dispatch = useAppDispatch();

  const onCompleteSet = () => {
    dispatch(completeSet(exercise.id));
    if (exercise.currentSet === exercise.sets - 1) {
      onCompleteExercise(true);
    }
  };

  const onCompleteExercise = (checked: boolean) => {
    if (checked) {
      dispatch(completeExercise(exercise.id));
      toast.success(`${exercise.name} completed!`);
    }
  };

  const setsProgress = (exercise.currentSet / exercise.sets) * 100;

  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Reps: {exercise.reps}</p>
        <p>Weight: {exercise.weight}</p>
        <div className="flex flex-col gap-2">
          <p>
            Sets: {exercise.currentSet}/{exercise.sets}
          </p>
          <Progress value={setsProgress} />
        </div>
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
