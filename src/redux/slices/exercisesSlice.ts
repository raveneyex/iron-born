import { StorageService } from '@/services/storageService';
import { IExercise } from '@/types/exercise';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

const storageService = StorageService.getInstance();
const storedExercises: IExercise[] = storageService.getExercises();

export type ExercisesSliceState = {
  exercises: IExercise[];
};

const initialState: ExercisesSliceState = {
  exercises: storedExercises,
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<IExercise>) => {
      state.exercises.push(action.payload);
      storageService.setExercises(state.exercises);
    },
    completeSet: (state, action: PayloadAction<string>) => {
      const index = state.exercises.findIndex((exercise) => exercise.id === action.payload);
      if (index !== -1) {
        const exercise = state.exercises[index];
        if (exercise.status === 'active') {
          state.exercises[index] = {
            ...exercise,
            currentSet: exercise.currentSet + 1,
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
          dateCompleted: new Date().toISOString(),
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

export const { addExercise, completeSet, completeExercise } = exercisesSlice.actions;

export const { selectActiveExercises, selectCompletedExercises } = exercisesSlice.selectors;
