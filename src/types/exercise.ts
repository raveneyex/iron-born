import { z } from 'zod';

export type ExerciseStatus = 'active' | 'completed';

const WeightUnitsSchema = z.enum(['kg', 'lbs']);

export type WeightUnits = z.infer<typeof WeightUnitsSchema>;

const WeightSchema = z.object({
  weight: z.number().min(1, { message: 'Weight must be at least 1' }).optional(),
  units: WeightUnitsSchema.optional(),
});

export type WeightData = z.infer<typeof WeightSchema>;

export const ExerciseSetSchema = z.object({
  reps: z.number().min(1, { message: 'Reps must be at least 1' }).optional(),
  weight: WeightSchema.optional(),
});

export type ExerciseSet = z.infer<typeof ExerciseSetSchema>;

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
