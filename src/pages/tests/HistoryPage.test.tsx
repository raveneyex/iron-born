import { renderWithRedux } from '@/lib/testUtils';
import { exercisesSlice } from '@/redux/slices/exercisesSlice';
import { IExercise, WeightUnits } from '@/types/exercise';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { HistoryPage } from '../HistoryPage';

const user = userEvent.setup();

describe('HistoryPage', () => {
  const createMockStore = (initialState: { exercises: IExercise[] }) => {
    return configureStore({
      reducer: {
        exercises: exercisesSlice.reducer,
      },
      preloadedState: {
        exercises: initialState,
      },
    });
  };

  describe('when there are completed exercises', () => {
    const completedExercise: IExercise = {
      id: '1',
      name: 'Bench Press',
      totalSets: 3,
      sets: [
        { id: 'set1', reps: 10, weight: 100, completed: true },
        { id: 'set2', reps: 8, weight: 120, completed: true },
        { id: 'set3', reps: 6, weight: 140, completed: true },
      ],
      weightUnits: 'kg' as WeightUnits,
      status: 'completed',
      totalReps: 24,
      totalWeight: 360,
      dateCompleted: Date.now(),
    };

    it('renders the page title and completed exercises table', () => {
      const store = createMockStore({
        exercises: [completedExercise],
      });

      const { getByRole, getByText } = renderWithRedux(<HistoryPage />, store);

      expect(getByText("Here's Everything You've Completed!")).toBeInTheDocument();
      expect(getByRole('table')).toBeInTheDocument();
      expect(getByText('Bench Press')).toBeInTheDocument();
    });

    it('removes the exercise when deleted', async () => {
      const store = createMockStore({
        exercises: [completedExercise],
      });

      const { getByText, getByRole } = renderWithRedux(<HistoryPage />, store);

      expect(getByText('Bench Press')).toBeInTheDocument();

      const deleteButton = getByRole('button', { name: /Delete Exercise/i });
      await user.click(deleteButton);

      expect(getByText('No exercises completed yet.')).toBeInTheDocument();
    });
  });

  describe('when there are no completed exercises', () => {
    it('shows empty state message when there are only active exercises', () => {
      const activeExercise: IExercise = {
        id: '1',
        name: 'Bench Press',
        totalSets: 3,
        sets: [],
        weightUnits: 'kg' as WeightUnits,
        status: 'active',
        currentSet: 1,
      };

      const store = createMockStore({
        exercises: [activeExercise],
      });

      const { getByRole, getByText } = renderWithRedux(<HistoryPage />, store);

      expect(getByText("Here's Everything You've Completed!")).toBeInTheDocument();
      expect(getByRole('table')).toBeInTheDocument();
      expect(getByText('No exercises completed yet.')).toBeInTheDocument();
    });
  });
});
