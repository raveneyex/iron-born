import { StorageService } from '@/services/storageService';
import {
  ActiveExercise,
  createExercise,
  createExerciseSet,
  ExerciseInputData,
  ExerciseSetInputData,
  IExercise,
  WeightUnits,
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

type UncompleteSetPayload = {
  exerciseId: string;
  setId: string;
};

type ChangeWeightUnitsPayload = {
  exerciseId: string;
  weightUnits: WeightUnits;
};

type DeleteSetPayload = {
  exerciseId: string;
  setId: string;
  setIsCompleted: boolean;
};

function findExerciseIndex(exercises: IExercise[], exerciseId: string) {
  return exercises.findIndex((exercise) => exercise.id === exerciseId);
}

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
      const index = findExerciseIndex(state.exercises, action.payload);
      if (index !== -1) {
        const exercise = state.exercises[index];
        exercise.totalSets++;
        exercise.sets.push(createExerciseSet());
      }
      storageService.setExercises(state.exercises);
    },
    deleteSet: (state, action: PayloadAction<DeleteSetPayload>) => {
      const { exerciseId, setId, setIsCompleted } = action.payload;
      const index = findExerciseIndex(state.exercises, exerciseId);
      if (index !== -1) {
        const exercise = state.exercises[index];
        exercise.sets = exercise.sets.filter((set) => set.id !== setId);
        exercise.totalSets--;
        if (exercise.status === 'active' && setIsCompleted) {
          exercise.currentSet--;
        }
      }
      storageService.setExercises(state.exercises);
    },
    changeWeightUnits: (state, action: PayloadAction<ChangeWeightUnitsPayload>) => {
      const { exerciseId, weightUnits } = action.payload;
      const index = findExerciseIndex(state.exercises, exerciseId);
      if (index !== -1) {
        state.exercises[index].weightUnits = weightUnits;
      }
    },
    completeSet: (state, action: PayloadAction<CompleteSetPayload>) => {
      const { exerciseId, setId, data } = action.payload;
      const index = findExerciseIndex(state.exercises, exerciseId);

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
    uncompleteSet: (state, action: PayloadAction<UncompleteSetPayload>) => {
      const { exerciseId, setId } = action.payload;
      const index = findExerciseIndex(state.exercises, exerciseId);
      if (index !== -1) {
        const exercise = state.exercises[index];
        const exerciseSets = exercise.sets.map((set) => {
          if (set.id === setId) {
            return { ...set, completed: false };
          }
          return set;
        });

        if (exercise.status === 'active') {
          state.exercises[index] = {
            ...exercise,
            currentSet: exercise.currentSet - 1,
            sets: exerciseSets,
          };
        }
      }
    },
    completeExercise: (state, action: PayloadAction<string>) => {
      const index = findExerciseIndex(state.exercises, action.payload);
      if (index !== -1) {
        const exercise = state.exercises[index];
        state.exercises[index] = {
          ...exercise,
          status: 'completed',
          dateCompleted: Date.now(),
        };
      }
      storageService.setExercises(state.exercises);
    },
    deleteExercise: (state, action: PayloadAction<string>) => {
      state.exercises = state.exercises.filter((exercise) => exercise.id !== action.payload);
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
    selectWeightUnits: (state, exerciseId: string) => {
      const exercise = state.exercises.find((exercise: IExercise) => exercise.id === exerciseId);
      if (!exercise) {
        return 'kg';
      }
      return exercise.weightUnits;
    },
  },
});

export const {
  addExercise,
  addSet,
  completeSet,
  completeExercise,
  changeWeightUnits,
  uncompleteSet,
  deleteSet,
  deleteExercise,
} = exercisesSlice.actions;

export const { selectActiveExercises, selectCompletedExercises, selectWeightUnits } = exercisesSlice.selectors;
