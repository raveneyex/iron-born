import { describe, expect, it, vi } from 'vitest';

import { exercisesSlice } from '../exercisesSlice';

import type { ExercisesSliceState } from '@/redux/slices/exercisesSlice';
import type { ActiveExercise, IExercise, WeightUnits } from '@/types/exercise';

vi.mock('@/services/storageService', () => ({
  StorageService: {
    getInstance: vi.fn().mockReturnValue({
      getExercises: vi.fn().mockReturnValue([]),
      setExercises: vi.fn(),
    }),
  },
}));

describe('exercisesSlice', () => {
  const initialState = {
    exercises: [],
  };

  describe('addExercise', () => {
    it('adds a new exercise to the state', () => {
      const action = exercisesSlice.actions.addExercise({
        name: 'Bench Press',
        totalSets: 3,
        weightUnits: 'kg',
      });

      const newState = exercisesSlice.reducer(initialState, action);

      expect(newState.exercises).toHaveLength(1);
      expect(newState.exercises[0]).toMatchObject({
        name: 'Bench Press',
        totalSets: 3,
        weightUnits: 'kg',
        status: 'active',
      });
    });
  });

  describe('addSet', () => {
    it('adds a new set to an existing exercise', () => {
      const exercise: ActiveExercise = {
        id: '1',
        name: 'Bench Press',
        totalSets: 1,
        sets: [{ id: 'set1', reps: 10, weight: 100, completed: false }],
        weightUnits: 'kg' as WeightUnits,
        status: 'active',
        currentSet: 1,
      };

      const state = {
        exercises: [exercise],
      };

      const action = exercisesSlice.actions.addSet('1');
      const newState = exercisesSlice.reducer(state, action);

      expect(newState.exercises[0].totalSets).toBe(2);
      expect(newState.exercises[0].sets).toHaveLength(2);
    });
  });

  describe('deleteSet', () => {
    it('removes a set from an exercise', () => {
      const exercise: ActiveExercise = {
        id: '1',
        name: 'Bench Press',
        totalSets: 2,
        sets: [
          { id: 'set1', reps: 10, weight: 100, completed: false },
          { id: 'set2', reps: 8, weight: 120, completed: true },
        ],
        weightUnits: 'kg' as WeightUnits,
        status: 'active',
        currentSet: 2,
      };

      const state = {
        exercises: [exercise],
      };

      const action = exercisesSlice.actions.deleteSet({
        exerciseId: '1',
        setId: 'set2',
        setIsCompleted: true,
      });

      const newState = exercisesSlice.reducer(state, action);
      const newExercise = newState.exercises[0];

      expect(newExercise.totalSets).toBe(1);
      expect(newExercise.sets).toHaveLength(1);
      if (newExercise.status !== 'active') {
        expect.fail('Exercise should be active');
      } else {
        expect(newExercise.currentSet).toBe(1);
      }
    });
  });

  describe('changeWeightUnits', () => {
    it('updates weight units for an exercise', () => {
      const exercise: ActiveExercise = {
        id: '1',
        name: 'Bench Press',
        totalSets: 1,
        sets: [],
        weightUnits: 'kg' as WeightUnits,
        status: 'active',
        currentSet: 1,
      };

      const state = {
        exercises: [exercise],
      };

      const action = exercisesSlice.actions.changeWeightUnits({
        exerciseId: '1',
        weightUnits: 'lbs' as WeightUnits,
      });

      const newState = exercisesSlice.reducer(state, action);

      expect(newState.exercises[0].weightUnits).toBe('lbs');
    });
  });

  describe('completeSet', () => {
    it('marks a set as completed and updates currentSet', () => {
      const exercise: ActiveExercise = {
        id: '1',
        name: 'Bench Press',
        totalSets: 2,
        sets: [
          { id: 'set1', reps: 10, weight: 100, completed: false },
          { id: 'set2', reps: 8, weight: 120, completed: false },
        ],
        weightUnits: 'kg' as WeightUnits,
        status: 'active',
        currentSet: 1,
      };

      const state = {
        exercises: [exercise],
      };

      const action = exercisesSlice.actions.completeSet({
        exerciseId: '1',
        setId: 'set1',
        data: { reps: 10, weight: 100, completed: true },
      });

      const newState = exercisesSlice.reducer(state, action);

      expect(newState.exercises[0].sets[0].completed).toBe(true);
      if (newState.exercises[0].status !== 'active') {
        expect.fail('Exercise should be active');
      } else {
        expect(newState.exercises[0].currentSet).toBe(2);
      }
    });
  });

  describe('uncompleteSet', () => {
    it('marks a set as uncompleted and updates currentSet', () => {
      const exercise: ActiveExercise = {
        id: '1',
        name: 'Bench Press',
        totalSets: 2,
        sets: [
          { id: 'set1', reps: 10, weight: 100, completed: true },
          { id: 'set2', reps: 8, weight: 120, completed: false },
        ],
        weightUnits: 'kg' as WeightUnits,
        status: 'active',
        currentSet: 2,
      };

      const state = {
        exercises: [exercise],
      };

      const action = exercisesSlice.actions.uncompleteSet({
        exerciseId: '1',
        setId: 'set1',
      });

      const newState = exercisesSlice.reducer(state, action);

      expect(newState.exercises[0].sets[0].completed).toBe(false);
      if (newState.exercises[0].status !== 'active') {
        expect.fail('Exercise should be active');
      } else {
        expect(newState.exercises[0].currentSet).toBe(1);
      }
    });
  });

  describe('completeExercise', () => {
    it('marks an exercise as completed and calculates totals', () => {
      const exercise: ActiveExercise = {
        id: '1',
        name: 'Bench Press',
        totalSets: 2,
        sets: [
          { id: 'set1', reps: 10, weight: 100, completed: true },
          { id: 'set2', reps: 8, weight: 120, completed: true },
        ],
        weightUnits: 'kg' as WeightUnits,
        status: 'active',
        currentSet: 2,
      };

      const state = {
        exercises: [exercise],
      };

      const action = exercisesSlice.actions.completeExercise('1');
      const newState = exercisesSlice.reducer(state, action);

      if (newState.exercises[0].status !== 'completed') {
        expect.fail('Exercise should be completed');
      } else {
        expect(newState.exercises[0].totalReps).toBe(18);
        expect(newState.exercises[0].totalWeight).toBe(220);
        expect(newState.exercises[0].dateCompleted).toBeDefined();
      }
    });
  });

  describe('deleteExercise', () => {
    it('removes an exercise from the state', () => {
      const exercise: ActiveExercise = {
        id: '1',
        name: 'Bench Press',
        totalSets: 1,
        sets: [],
        weightUnits: 'kg' as WeightUnits,
        status: 'active',
        currentSet: 1,
      };

      const state = {
        exercises: [exercise],
      };

      const action = exercisesSlice.actions.deleteExercise('1');
      const newState = exercisesSlice.reducer(state, action);

      expect(newState.exercises).toHaveLength(0);
    });
  });

  describe('selectors', () => {
    const mockExercises: IExercise[] = [
      {
        id: '1',
        name: 'Active Exercise',
        totalSets: 1,
        sets: [],
        weightUnits: 'kg' as WeightUnits,
        status: 'active',
        currentSet: 1,
      },
      {
        id: '2',
        name: 'Completed Exercise',
        totalSets: 1,
        sets: [],
        weightUnits: 'lbs' as WeightUnits,
        status: 'completed',
        totalReps: 10,
        totalWeight: 100,
        dateCompleted: Date.now(),
      },
    ];
    const mockState: ExercisesSliceState = {
      exercises: mockExercises,
    };

    describe('selectActiveExercises', () => {
      it('should return only active exercises', () => {
        const result = exercisesSlice.selectors.selectActiveExercises({ exercises: mockState });
        expect(result).toHaveLength(1);
        expect(result[0].status).toBe('active');
        expect(result[0].name).toBe('Active Exercise');
      });

      it('should return empty array when no active exercises', () => {
        const emptyState = {
          exercises: [
            {
              id: '2',
              name: 'Completed Exercise',
              totalSets: 1,
              sets: [],
              weightUnits: 'lbs' as WeightUnits,
              status: 'completed' as const,
              totalReps: 10,
              totalWeight: 100,
              dateCompleted: Date.now(),
            },
          ],
        };
        const result = exercisesSlice.selectors.selectActiveExercises({
          exercises: emptyState,
        });
        expect(result).toHaveLength(0);
      });
    });

    describe('selectCompletedExercises', () => {
      it('should return only completed exercises', () => {
        const result = exercisesSlice.selectors.selectCompletedExercises({ exercises: mockState });
        expect(result).toHaveLength(1);
        expect(result[0].status).toBe('completed');
        expect(result[0].name).toBe('Completed Exercise');
      });

      it('should return empty array when no completed exercises', () => {
        const emptyState = {
          exercises: [
            {
              id: '1',
              name: 'Active Exercise',
              totalSets: 1,
              sets: [],
              weightUnits: 'kg' as WeightUnits,
              status: 'active' as const,
              currentSet: 1,
            },
          ],
        };
        const result = exercisesSlice.selectors.selectCompletedExercises({ exercises: emptyState });
        expect(result).toHaveLength(0);
      });
    });

    describe('selectWeightUnits', () => {
      it('should return weight units for existing exercise', () => {
        const result = exercisesSlice.selectors.selectWeightUnits({ exercises: mockState }, '1');
        expect(result).toBe('kg');
      });

      it('should return default weight units (kg) for non-existent exercise', () => {
        const result = exercisesSlice.selectors.selectWeightUnits({ exercises: mockState }, 'non-existent');
        expect(result).toBe('kg');
      });
    });
  });
});
