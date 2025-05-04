import { ActiveExercise } from '@/types/exercise';
import { ExerciseSetRow, ExerciseSetRowProps } from './ExerciseSetRow';

type OnCompleteSet = ExerciseSetRowProps['onCompleteSet'];
type OnUncompleteSet = ExerciseSetRowProps['onUncompleteSet'];
type OnDeleteSet = ExerciseSetRowProps['onDeleteSet'];
type OnUnitsChange = ExerciseSetRowProps['onUnitsChange'];

interface ExerciseSetsProps {
  exercise: ActiveExercise;
  onCompleteSet: OnCompleteSet;
  onUncompleteSet: OnUncompleteSet;
  onDeleteSet: OnDeleteSet;
  onUnitsChange: OnUnitsChange;
}

export function ExerciseSets(props: ExerciseSetsProps) {
  const { exercise, onCompleteSet, onUncompleteSet, onDeleteSet, onUnitsChange } = props;

  return (
    <div className="grid grid-cols-[auto_auto_auto_auto_auto] gap-2" data-testid="exercise-sets">
      <h1 className="text-sm font-bold ml-2">Reps</h1>
      <h1 className="text-sm font-bold ml-2">Weight</h1>
      <h1 className="text-sm font-bold ml-2">Units</h1>
      <h1 className="text-sm font-bold">Delete</h1>
      <h1 className="text-sm font-bold">Complete</h1>

      {exercise.sets.map((set) => (
        <ExerciseSetRow
          key={set.id}
          exerciseId={exercise.id}
          set={set}
          onCompleteSet={onCompleteSet}
          onUncompleteSet={onUncompleteSet}
          onDeleteSet={onDeleteSet}
          onUnitsChange={onUnitsChange}
        />
      ))}
    </div>
  );
}
