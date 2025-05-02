import { IExercise } from '@/types/exercise';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Checkbox } from '../ui/checkbox';

interface ExerciseCardProps {
  exercise: IExercise;
}

export function ExerciseCard(props: ExerciseCardProps) {
  const { exercise } = props;

  const completedExerciseCheckboxId = `${exercise.name}-completed`;

  const onCompleteSet = () => {
    console.log('Complete set');
  };

  const onCompleteExercise = (checked: boolean) => {
    if (checked) {
      console.log(`Complete exercise: ${exercise.name}`);
    } else {
      console.log(`Incomplete exercise: ${exercise.name}`);
    }
  };

  return (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle>{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Sets: {exercise.sets}</p>
        <p>Reps: {exercise.reps}</p>
        <p>Weight: {exercise.weight}</p>
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
