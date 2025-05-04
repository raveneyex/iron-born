import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addExercise, selectActiveExercises } from '@/redux/slices/exercisesSlice';
import { IExercise } from '@/types/exercise';
import { useState } from 'react';
import { AddExerciseDialog } from './AddExerciseDialog';
import { ExerciseGrid } from './ExerciseGrid';

// const exercises: IExercise[] = [
//   {
//     name: 'Bench Press',
//     sets: 3,
//     reps: 10,
//     weight: 100,
//   },
//   {
//     name: 'Squats',
//     sets: 3,
//     reps: 10,
//     weight: 100,
//   },
//   {
//     name: 'Deadlift',
//     sets: 3,
//     reps: 10,
//     weight: 100,
//   },
//   {
//     name: 'Pull-ups',
//     sets: 3,
//     reps: 10,
//     weight: 100,
//   },
//   {
//     name: 'Push-ups',
//     sets: 3,
//     reps: 10,
//     weight: 100,
//   },
//   {
//     name: 'Bicep Curls',
//     sets: 3,
//     reps: 10,
//     weight: 100,
//   },
//   {
//     name: 'Triceps Extension',
//     sets: 3,
//     reps: 10,
//     weight: 100,
//   },
//   {
//     name: 'Lateral Raises',
//     sets: 3,
//     reps: 10,
//     weight: 100,
//   },
// ];

export function ActiveExercises() {
  const [addExerciseDialogOpen, setAddExerciseDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  const activeExercises = useAppSelector(selectActiveExercises);

  const handleAddExercise = (exercise: IExercise) => {
    dispatch(addExercise(exercise));
    setAddExerciseDialogOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 mt-4 gap-4">
        <h1 className="text-4xl font-bold ">Active Exercises</h1>
        <AddExerciseDialog
          open={addExerciseDialogOpen}
          setOpen={setAddExerciseDialogOpen}
          onAddExercise={handleAddExercise}
        />
      </div>
      {activeExercises.length > 0 ? (
        <ExerciseGrid exercises={activeExercises} />
      ) : (
        <div className="flex flex-col items-center justify-center self-center">
          <h2 className="text-center text-gray-500">No active exercises!</h2>
          <h3 className="text-center text-gray-500">
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 hover:underline"
              onClick={() => setAddExerciseDialogOpen(true)}
            >
              Add an exercise to get started
            </a>
          </h3>
        </div>
      )}
    </div>
  );
}
