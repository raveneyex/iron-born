import { renderWithRedux } from '@/lib/testUtils';
import { exercisesSlice } from '@/redux/slices/exercisesSlice';
import { IExercise } from '@/types/exercise';
import { configureStore } from '@reduxjs/toolkit';
import { describe, expect, it, vi } from 'vitest';
import { ExerciseSets } from '../ExerciseSets';

const mockExercise: IExercise = {
  id: 'exercise-1',
  name: 'Bench Press',
  totalSets: 3,
  sets: [
    { id: 'set-1', reps: 10, weight: 100, completed: false },
    { id: 'set-2', reps: 8, weight: 120, completed: true },
    { id: 'set-3', reps: 8, weight: 120, completed: false },
  ],
  weightUnits: 'kg',
  status: 'active',
  currentSet: 1,
};

const defaultProps = {
  exercise: mockExercise,
  onCompleteSet: vi.fn(),
  onUncompleteSet: vi.fn(),
  onDeleteSet: vi.fn(),
  onUnitsChange: vi.fn(),
};

const createMockStore = (exercises: IExercise[] = [mockExercise]) => {
  return configureStore({
    reducer: {
      exercises: exercisesSlice.reducer,
    },
    preloadedState: {
      exercises: {
        exercises,
      },
    },
  });
};

describe('ExerciseSets', () => {
  it('renders grid with headers', () => {
    const { getByRole } = renderWithRedux(<ExerciseSets {...defaultProps} />, createMockStore());

    expect(getByRole('columnheader', { name: 'Reps' })).toBeInTheDocument();
    expect(getByRole('columnheader', { name: 'Weight' })).toBeInTheDocument();
    expect(getByRole('columnheader', { name: 'Units' })).toBeInTheDocument();
    expect(getByRole('columnheader', { name: 'Delete' })).toBeInTheDocument();
    expect(getByRole('columnheader', { name: 'Complete' })).toBeInTheDocument();
  });

  it('renders ExerciseSetRow for each set', () => {
    const { getAllByTestId } = renderWithRedux(<ExerciseSets {...defaultProps} />, createMockStore());

    const setRows = getAllByTestId(/exercise-exercise-1-set-row-/);
    expect(setRows).toHaveLength(3);
  });

  it('passes correct props to ExerciseSetRow', () => {
    const { getByTestId } = renderWithRedux(<ExerciseSets {...defaultProps} />, createMockStore());

    const firstSetRow = getByTestId('exercise-exercise-1-set-row-set-1');
    expect(firstSetRow).toBeInTheDocument();

    const secondSetRow = getByTestId('exercise-exercise-1-set-row-set-2');
    expect(secondSetRow).toBeInTheDocument();

    const thirdSetRow = getByTestId('exercise-exercise-1-set-row-set-3');
    expect(thirdSetRow).toBeInTheDocument();
  });

  it('renders empty state when no sets', () => {
    const exerciseWithoutSets = { ...mockExercise, sets: [] };
    const { queryByTestId } = renderWithRedux(
      <ExerciseSets {...defaultProps} exercise={exerciseWithoutSets} />,
      createMockStore()
    );

    const setRows = queryByTestId(/exercise-exercise-1-set-row-/);
    expect(setRows).not.toBeInTheDocument();
  });
});
