import { IExercise } from '@/types/exercise';
import { AddExerciseDialog } from './AddExerciseDialog';
import { ExerciseGrid } from './ExerciseGrid';

const exercises: IExercise[] = [
  {
    name: 'Bench Press',
    sets: 3,
    reps: 10,
    weight: 100,
  },
  {
    name: 'Squats',
    sets: 3,
    reps: 10,
    weight: 100,
  },
  {
    name: 'Deadlift',
    sets: 3,
    reps: 10,
    weight: 100,
  },
  {
    name: 'Pull-ups',
    sets: 3,
    reps: 10,
    weight: 100,
  },
  {
    name: 'Push-ups',
    sets: 3,
    reps: 10,
    weight: 100,
  },
  {
    name: 'Bicep Curls',
    sets: 3,
    reps: 10,
    weight: 100,
  },
  {
    name: 'Triceps Extension',
    sets: 3,
    reps: 10,
    weight: 100,
  },
  {
    name: 'Lateral Raises',
    sets: 3,
    reps: 10,
    weight: 100,
  },
];

export function ActiveExercises() {
  const handleAddExercise = (exercise: IExercise) => {
    console.log(exercise);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 mt-4 gap-4">
        <h1 className="text-4xl font-bold ">Active Exercises</h1>
        <AddExerciseDialog onAddExercise={handleAddExercise} />
      </div>
      {exercises.length > 0 ? (
        <ExerciseGrid exercises={exercises} />
      ) : (
        <div className="flex flex-col items-center justify-center self-center">
          <h2 className="text-center text-gray-500">No active exercises!</h2>
          <h3 className="text-center text-gray-500">Add an exercise to get started</h3>
        </div>
      )}
    </div>
  );
}
