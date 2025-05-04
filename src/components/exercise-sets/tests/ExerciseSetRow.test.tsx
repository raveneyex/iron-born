import { renderWithRedux } from '@/lib/testUtils';
import { exercisesSlice } from '@/redux/slices/exercisesSlice';
import { IExercise } from '@/types/exercise';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event/dist/cjs/setup/index.js';
import { describe, expect, it, vi } from 'vitest';
import { ExerciseSetRow } from '../ExerciseSetRow';

const user = userEvent.setup();

const mockSet = {
  id: 'set-1',
  reps: 10,
  weight: 100,
  completed: false,
};

const defaultProps = {
  exerciseId: 'exercise-1',
  set: mockSet,
  onCompleteSet: vi.fn(),
  onUncompleteSet: vi.fn(),
  onDeleteSet: vi.fn(),
  onUnitsChange: vi.fn(),
};

const mockActiveExercises: IExercise[] = [
  {
    id: 'exercise-1',
    name: 'Bench Press',
    totalSets: 1,
    sets: [],
    weightUnits: 'kg',
    status: 'active',
    currentSet: 1,
  },
  {
    id: 'exercise-2',
    name: 'Squats',
    totalSets: 1,
    sets: [],
    weightUnits: 'lbs',
    status: 'active',
    currentSet: 1,
  },
];

const createMockStore = (exercises = mockActiveExercises) => {
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

describe('ExerciseSetRow', () => {
  it('renders form inputs and buttons', () => {
    const { getByRole, getByPlaceholderText } = renderWithRedux(
      <ExerciseSetRow {...defaultProps} />,
      createMockStore()
    );

    expect(getByPlaceholderText('Reps')).toBeInTheDocument();
    expect(getByPlaceholderText('Weight')).toBeInTheDocument();
    expect(getByRole('button', { name: /Delete Set/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /Complete Set/i })).toBeInTheDocument();
  });

  it('handles weight and reps input changes', async () => {
    const { getByPlaceholderText } = renderWithRedux(<ExerciseSetRow {...defaultProps} />, createMockStore());

    const weightInput = getByPlaceholderText('Weight');
    const repsInput = getByPlaceholderText('Reps');

    await user.clear(weightInput);
    await user.type(weightInput, '120');
    await user.clear(repsInput);
    await user.type(repsInput, '12');

    expect(weightInput).toHaveValue(120);
    expect(repsInput).toHaveValue(12);
  });

  it('handles weight units change', async () => {
    const { getByRole } = renderWithRedux(<ExerciseSetRow {...defaultProps} />, createMockStore());

    const unitsSelect = getByRole('combobox');
    fireEvent.click(unitsSelect);

    const lbsOption = getByRole('option', { name: 'lbs' });
    expect(lbsOption).toBeInTheDocument();

    fireEvent.click(lbsOption);

    expect(defaultProps.onUnitsChange).toHaveBeenCalledWith({
      exerciseId: 'exercise-1',
      weightUnits: 'lbs',
    });
  });

  it('handles set completion', async () => {
    const { getByRole } = renderWithRedux(<ExerciseSetRow {...defaultProps} />, createMockStore());

    const completeButton = getByRole('button', { name: /Complete Set/i });
    await user.click(completeButton);

    expect(defaultProps.onCompleteSet).toHaveBeenCalledWith({
      exerciseId: 'exercise-1',
      setId: 'set-1',
      data: {
        reps: 10,
        weight: 100,
        completed: false,
      },
    });
  });

  it('handles set uncompletion', async () => {
    const completedSet = { ...mockSet, completed: true };
    const { getByRole } = renderWithRedux(<ExerciseSetRow {...defaultProps} set={completedSet} />, createMockStore());

    const uncompleteButton = getByRole('button', { name: /Uncomplete Set/i });
    await user.click(uncompleteButton);

    expect(defaultProps.onUncompleteSet).toHaveBeenCalledWith({
      exerciseId: 'exercise-1',
      setId: 'set-1',
    });
  });

  it('handles set deletion', async () => {
    const { getByRole } = renderWithRedux(<ExerciseSetRow {...defaultProps} />, createMockStore());

    const deleteButton = getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(defaultProps.onDeleteSet).toHaveBeenCalledWith({
      exerciseId: 'exercise-1',
      setId: 'set-1',
      setIsCompleted: false,
    });
  });

  it('disables inputs when set is completed', () => {
    const completedSet = { ...mockSet, completed: true };
    const { getByPlaceholderText } = renderWithRedux(
      <ExerciseSetRow {...defaultProps} set={completedSet} />,
      createMockStore()
    );

    const weightInput = getByPlaceholderText('Weight');
    const repsInput = getByPlaceholderText('Reps');

    expect(weightInput).toBeDisabled();
    expect(repsInput).toBeDisabled();
  });
});
