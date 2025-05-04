import { useAppDispatch } from '@/redux/hooks';
import { addSet, completeExercise } from '@/redux/slices/exercisesSlice';
import { ActiveExercise } from '@/types/exercise';
import { Label } from '@radix-ui/react-label';
import { toast } from 'sonner';
import { ExerciseSets } from '../exercise-sets/ExerciseSets';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';

interface ExerciseCardProps {
  exercise: ActiveExercise;
}

export function ExerciseCard(props: ExerciseCardProps) {
  const { exercise } = props;
  const completedExerciseCheckboxId = `${exercise.id}-completed`;

  const dispatch = useAppDispatch();

  // const onCompleteSet = () => {
  //   dispatch(completeSet(exercise.id));
  //   if (exercise.currentSet === exercise.totalSets - 1) {
  //     onCompleteExercise(true);
  //   }
  // };

  const onAddSet = () => {
    dispatch(addSet(exercise.id));
  };

  const onCompleteExercise = (checked: boolean) => {
    if (checked) {
      dispatch(completeExercise(exercise.id));
      toast.success(`${exercise.name} completed!`);
    }
  };

  const setsProgress = (exercise.currentSet / exercise.totalSets) * 100;

  return (
    <Card className="md:h-[420px] box-border">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-sm font-bold">{exercise.name}</h1>
            <h1 className="text-sm font-bold">
              {exercise.currentSet}/{exercise.totalSets}
            </h1>
          </div>
        </CardTitle>
        <CardDescription>
          <Progress value={setsProgress} />
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 md:overflow-y-auto custom-scrollbar overflow-x-hidden">
        <ExerciseSets exercise={exercise} />
      </CardContent>
      <CardFooter className="flex flex-col justify-between items-start gap-2">
        <Button onClick={onAddSet}>Add Set</Button>
        <div className="flex items-center gap-2">
          <Checkbox id={completedExerciseCheckboxId} onCheckedChange={onCompleteExercise} />
          <Label htmlFor={completedExerciseCheckboxId}>Mark as completed</Label>
        </div>
      </CardFooter>
    </Card>
  );
}
