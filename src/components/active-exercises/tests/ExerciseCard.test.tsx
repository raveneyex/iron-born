import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { describe, expect, it, vi } from 'vitest';

import { ExerciseCard } from '../ExerciseCard';

import type { ActiveExercise, WeightUnits } from '@/types/exercise';

import { renderWithRedux } from '@/lib/testUtils';
import { exercisesSlice } from '@/redux/slices/exercisesSlice';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

const mockExercise: ActiveExercise = {
  id: '1',
  name: 'Bench Press',
  currentSet: 1,
  totalSets: 4,
  sets: [],
  weightUnits: 'kg' as WeightUnits,
  status: 'active',
};

const user = userEvent.setup();

const createMockStore = () => {
  return configureStore({
    reducer: {
      exercises: exercisesSlice.reducer,
    },
  });
};

describe('ExerciseCard', () => {
  it('renders exercise name and progress', () => {
    const { getByText, getByTestId } = renderWithRedux(<ExerciseCard exercise={mockExercise} />, createMockStore());

    expect(getByText(mockExercise.name)).toBeInTheDocument();
    expect(getByText(`${mockExercise.currentSet}/${mockExercise.totalSets}`)).toBeInTheDocument();
    expect(getByTestId('exercise-sets')).toBeInTheDocument();
  });

  it('renders all action buttons', () => {
    const { getByText, getByRole, getByTestId } = renderWithRedux(
      <ExerciseCard exercise={mockExercise} />,
      createMockStore()
    );

    expect(getByText('Add Set')).toBeInTheDocument();
    expect(getByRole('button', { name: /Delete Exercise/i })).toBeInTheDocument();
    expect(getByTestId('completed-checkbox')).toBeInTheDocument();
  });

  it('shows toast when exercise is completed', async () => {
    const { getByTestId } = renderWithRedux(<ExerciseCard exercise={mockExercise} />, createMockStore());

    const checkbox = getByTestId('completed-checkbox');

    await user.click(checkbox);

    expect(toast.success).toHaveBeenCalledWith(`${mockExercise.name} completed!`);
  });

  it('renders progress bar with correct value', () => {
    const { getByRole } = renderWithRedux(<ExerciseCard exercise={mockExercise} />, createMockStore());

    const progressBar = getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();

    const progressBarValue = progressBar.querySelector('[data-slot="progress-indicator"]');
    const expectedValue = 100 - (mockExercise.currentSet / mockExercise.totalSets) * 100;

    expect(progressBarValue).toHaveStyle(`transform: translateX(-${expectedValue}%);`);
  });
});
