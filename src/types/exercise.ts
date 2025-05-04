export type ExerciseStatus = 'active' | 'completed';

type BaseExercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
};

type ActiveExercise = BaseExercise & {
  status: 'active';
  currentSet: number;
};

type CompletedExercise = BaseExercise & {
  status: 'completed';
  dateCompleted: string;
};

export type IExercise = ActiveExercise | CompletedExercise;
