import { ExerciseCard } from './ExerciseCard';

import type { ActiveExercise } from '@/types/exercise';

interface ExerciseGridProps {
  exercises: ActiveExercise[];
}

export function ExerciseGrid(props: ExerciseGridProps) {
  const { exercises } = props;

  return (
    <div className="flex flex-row flex-wrap gap-4 items-center justify-center w-full">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
