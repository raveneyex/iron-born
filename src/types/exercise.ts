import { nanoid } from '@reduxjs/toolkit';
import { z } from 'zod';

export type ExerciseStatus = 'active' | 'completed';

const WeightUnitsSchema = z.enum(['kg', 'lbs']);

export type WeightUnits = z.infer<typeof WeightUnitsSchema>;

export const ExerciseSetSchema = z.object({
  reps: z.number().min(1, { message: 'Reps must be at least 1' }),
  weight: z.number().min(1, { message: 'Weight must be at least 1' }),
  completed: z.boolean(),
});

export type ExerciseSetInputData = z.infer<typeof ExerciseSetSchema>;

export type ExerciseSet = ExerciseSetInputData & {
  id: string;
};

export const ExerciseInputSchema = z.object({
  name: z.string().min(5, { message: 'Name must be at least 5 characters long' }),
  totalSets: z.number().min(1, { message: 'Sets must be at least 1' }),
  weightUnits: WeightUnitsSchema,
});

export type ExerciseInputData = z.infer<typeof ExerciseInputSchema>;

type BaseExercise = {
  id: string;
  name: string;
  totalSets: number;
  sets: ExerciseSet[];
  weightUnits: WeightUnits;
};

export type ActiveExercise = BaseExercise & {
  status: 'active';
  currentSet: number;
};

export type CompletedExercise = BaseExercise & {
  status: 'completed';
  dateCompleted: number;
  totalReps: number;
  totalWeight: number;
};

export type IExercise = ActiveExercise | CompletedExercise;

export function createExerciseSet(): ExerciseSet {
  return {
    id: nanoid(),
    reps: 8,
    weight: 10,
    completed: false,
  };
}

export function createExercise(data: ExerciseInputData): ActiveExercise {
  return {
    ...data,
    status: 'active',
    currentSet: 0,
    id: nanoid(),
    sets: Array.from({ length: data.totalSets }, () => createExerciseSet()),
  };
}
