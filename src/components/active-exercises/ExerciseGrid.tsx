import { IExercise } from '@/types/exercise';
import { ExerciseCard } from './ExerciseCard';

interface ExerciseGridProps {
  exercises: IExercise[];
}

export function ExerciseGrid(props: ExerciseGridProps) {
  const { exercises } = props;

  return (
    <div className="flex flex-row flex-wrap gap-4 items-center justify-center w-full">
      {exercises.map((exercise, index) => (
        <ExerciseCard key={`${exercise.name}-${index}`} exercise={exercise} />
      ))}
    </div>
  );
}
