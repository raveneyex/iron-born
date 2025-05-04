export type ExerciseStatus = 'active' | 'completed';

type WeightUnits = 'kg' | 'lbs';

type WeightData = {
  weight: number;
  units: WeightUnits;
};

export type ExerciseSet = {
  reps?: number;
  weight?: WeightData;
};

type BaseExercise = {
  id: string;
  name: string;
  totalSets: number;
  sets: ExerciseSet[];
};

export type ActiveExercise = BaseExercise & {
  status: 'active';
  currentSet: number;
};

export type CompletedExercise = BaseExercise & {
  status: 'completed';
  dateCompleted: number;
};

export type IExercise = ActiveExercise | CompletedExercise;
