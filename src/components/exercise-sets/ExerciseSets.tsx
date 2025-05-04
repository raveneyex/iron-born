import { ActiveExercise } from '@/types/exercise';
import { ExerciseSetRow } from './ExerciseSetRow';

interface ExerciseSetsProps {
  exercise: ActiveExercise;
}

export function ExerciseSets(props: ExerciseSetsProps) {
  const { exercise } = props;

  return (
    <div className="grid grid-cols-[auto_auto_auto_auto] gap-2">
      <h1 className="text-sm font-bold ml-2">Reps</h1>
      <h1 className="text-sm font-bold ml-2">Weight</h1>
      <h1 className="text-sm font-bold ml-2">Units</h1>
      <h1 className="text-sm font-bold">Complete</h1>

      {Array.from({ length: exercise.totalSets }).map((_, index) => (
        <ExerciseSetRow key={index} exerciseId={exercise.id} />
      ))}
    </div>
  );
}
