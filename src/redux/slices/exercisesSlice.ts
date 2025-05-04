import { IExercise } from '@/types/exercise';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ExercisesSliceState = {
  exercises: IExercise[];
};

const initialState: ExercisesSliceState = {
  exercises: [],
};

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<IExercise>) => {
      state.exercises.push(action.payload);
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
    },
    completeExercise: (state, action: PayloadAction<string>) => {
      const index = state.exercises.findIndex((exercise) => exercise.name === action.payload);
      if (index !== -1) {
        const exercise = state.exercises[index];
        state.exercises[index] = {
          ...exercise,
          status: 'completed',
          dateCompleted: new Date().toISOString(),
        };
      }
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
