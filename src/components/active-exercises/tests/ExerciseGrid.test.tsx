import { renderWithRedux } from '@/lib/testUtils';
import { exercisesSlice } from '@/redux/slices/exercisesSlice';
import { ActiveExercise } from '@/types/exercise';
import { configureStore } from '@reduxjs/toolkit';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { describe, expect, it } from 'vitest';
import { ExerciseGrid } from '../ExerciseGrid';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

const user = userEvent.setup();

const mockExercises: ActiveExercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    currentSet: 1,
    totalSets: 3,
    sets: [],
    weightUnits: 'kg',
    status: 'active',
  },
  {
    id: '2',
    name: 'Squats',
    currentSet: 2,
    totalSets: 4,
    sets: [],
    weightUnits: 'kg',
    status: 'active',
  },
];

const createMockStore = () => {
  return configureStore({
    reducer: {
      exercises: exercisesSlice.reducer,
    },
  });
};

describe('ExerciseGrid', () => {
  it('renders the correct number of exercise cards', () => {
    const { getAllByTestId } = renderWithRedux(<ExerciseGrid exercises={mockExercises} />, createMockStore());
    const exerciseCards = getAllByTestId('exercise-card');
    expect(exerciseCards).toHaveLength(mockExercises.length);
  });

  it('passes the correct exercise data to each card', () => {
    const { getAllByTestId } = renderWithRedux(<ExerciseGrid exercises={mockExercises} />, createMockStore());
    const exerciseCards = getAllByTestId('exercise-card');

    exerciseCards.forEach((card, index) => {
      const exercise = mockExercises[index];
      expect(card).toHaveAttribute('data-exercise-id', exercise.id);
      expect(card).toHaveAttribute('data-exercise-name', exercise.name);
    });
  });

  it('renders an empty grid when no exercises are provided', () => {
    const { queryByTestId } = render(<ExerciseGrid exercises={[]} />);
    const exerciseCards = queryByTestId('exercise-card');
    expect(exerciseCards).not.toBeInTheDocument();
  });

  it('deletes exercise when delete button is clicked', async () => {
    const { getAllByTestId, queryByTestId } = renderWithRedux(
      <ExerciseGrid exercises={mockExercises} />,
      createMockStore()
    );

    const exerciseCards = getAllByTestId('exercise-card');
    expect(exerciseCards).toHaveLength(mockExercises.length);
    const { getByRole } = within(exerciseCards[0]);
    const deleteButton = getByRole('button', { name: 'Delete Exercise' });
    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(`${mockExercises[0].name} deleted`);
      expect(queryByTestId('exercise-card-1')).not.toBeInTheDocument();
    });
  });
});
