import { ActiveExercise, WeightUnits } from '@/types/exercise';
import { describe, expect, it, vi } from 'vitest';
import { exercisesSlice } from '../exercisesSlice';

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
});
