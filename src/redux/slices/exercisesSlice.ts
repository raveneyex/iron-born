import { StorageService } from '@/services/storageService';
import {
  ActiveExercise,
  createExercise,
  createExerciseSet,
  ExerciseInputData,
  ExerciseSetInputData,
  IExercise,
} from '@/types/exercise';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

const storageService = StorageService.getInstance();
const storedExercises: IExercise[] = storageService.getExercises();

export type ExercisesSliceState = {
  exercises: IExercise[];
};

const initialState: ExercisesSliceState = {
  exercises: storedExercises,
};

type CompleteSetPayload = {
  exerciseId: string;
  setId: string;
  data: ExerciseSetInputData;
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<ExerciseInputData>) => {
      const newExercise: ActiveExercise = createExercise(action.payload);
      state.exercises.push(newExercise);
      storageService.setExercises(state.exercises);
    },
    addSet: (state, action: PayloadAction<string>) => {
      const index = state.exercises.findIndex((exercise) => exercise.id === action.payload);
      if (index !== -1) {
        const exercise = state.exercises[index];
        exercise.totalSets++;
        exercise.sets.push(createExerciseSet());
      }
      storageService.setExercises(state.exercises);
    },
    completeSet: (state, action: PayloadAction<CompleteSetPayload>) => {
      const { exerciseId, setId, data } = action.payload;
      const index = state.exercises.findIndex((exercise) => exercise.id === exerciseId);

      if (index !== -1) {
        const exercise = state.exercises[index];
        const exerciseSets = exercise.sets.map((set) => {
          if (set.id === setId) {
            return { ...set, ...data, completed: true };
          }
          return set;
        });

        if (exercise.status === 'active') {
          state.exercises[index] = {
            ...exercise,
            currentSet: exercise.currentSet + 1,
            sets: exerciseSets,
          };
        }
      }
      storageService.setExercises(state.exercises);
    },
    completeExercise: (state, action: PayloadAction<string>) => {
      const index = state.exercises.findIndex((exercise) => exercise.id === action.payload);
      if (index !== -1) {
        const exercise = state.exercises[index];
        state.exercises[index] = {
          ...exercise,
          status: 'completed',
          dateCompleted: Date.now() - 1000 * 60 * 60 * 24,
        };
      }
      storageService.setExercises(state.exercises);
    },
  },
  selectors: {
    selectActiveExercises: createSelector(
      (state) => state.exercises,
      (exercises) => exercises.filter((exercise: IExercise) => exercise.status === 'active')
    ),
    selectCompletedExercises: createSelector(
      (state) => state.exercises,
      (exercises) => exercises.filter((exercise: IExercise) => exercise.status === 'completed')
    ),
  },
});

export const { addExercise, addSet, completeSet, completeExercise } = exercisesSlice.actions;

export const { selectActiveExercises, selectCompletedExercises } = exercisesSlice.selectors;
