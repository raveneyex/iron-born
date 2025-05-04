import { ActiveExercise } from '@/types/exercise';
import { ExerciseSetRow, ExerciseSetRowProps } from './ExerciseSetRow';

type OnCompleteSet = ExerciseSetRowProps['onCompleteSet'];
type OnUncompleteSet = ExerciseSetRowProps['onUncompleteSet'];

interface ExerciseSetsProps {
  exercise: ActiveExercise;
  onCompleteSet: OnCompleteSet;
  onUncompleteSet: OnUncompleteSet;
}

export function ExerciseSets(props: ExerciseSetsProps) {
  const { exercise, onCompleteSet, onUncompleteSet } = props;

  console.log('exercise sets', exercise.sets);

  return (
    <div className="grid grid-cols-[auto_auto_auto_auto] gap-2">
      <h1 className="text-sm font-bold ml-2">Reps</h1>
      <h1 className="text-sm font-bold ml-2">Weight</h1>
      <h1 className="text-sm font-bold ml-2">Units</h1>
      <h1 className="text-sm font-bold">Complete</h1>

      {exercise.sets.map((set) => (
        <ExerciseSetRow
          key={set.id}
          exerciseId={exercise.id}
          set={set}
          onCompleteSet={onCompleteSet}
          onUncompleteSet={onUncompleteSet}
        />
      ))}
    </div>
  );
}
