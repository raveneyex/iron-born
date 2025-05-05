import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { IExercise, WeightUnits } from '@/types/exercise';
import type { IQuote } from '@/types/quote';

import { renderWithRedux } from '@/lib/testUtils';
import { DashboardPage } from '@/pages/DashboardPage';
import { makeStore } from '@/redux/store';
import { RequestStatuses } from '@/types/requestStatuses';

/*
 * Mock the RotatingQuotes component due to errors thrown by the Autoplay plugin
 * not executing well in the test environment
 */
vi.mock('@/components/rotating-quotes/RotatingQuotes', () => ({
  RotatingQuotes: () => <div data-testid="rotating-quotes">Mocked Rotating Quotes</div>,
}));

const user = userEvent.setup();

describe('DashboardPage', () => {
  const createMockStore = (initialState: { exercises: IExercise[]; quotes: IQuote[] }) => {
    return makeStore({
      exercises: { exercises: initialState.exercises },
      quotes: { quotes: initialState.quotes, status: RequestStatuses.succeeded, error: null },
    });
  };

  describe('when there are active exercises', () => {
    const activeExercise: IExercise = {
      id: '1',
      name: 'Bench Press',
      totalSets: 3,
      sets: [
        { id: 'set1', reps: 10, weight: 100, completed: false },
        { id: 'set2', reps: 8, weight: 120, completed: false },
        { id: 'set3', reps: 6, weight: 140, completed: false },
      ],
      weightUnits: 'kg' as WeightUnits,
      status: 'active',
      currentSet: 1,
    };

    const mockQuotes: IQuote[] = [
      { text: 'Test quote 1', author: 'Author 1' },
      { text: 'Test quote 2', author: 'Author 2' },
    ];

    it('renders the page title, quotes, and active exercises', () => {
      const store = createMockStore({
        exercises: [activeExercise],
        quotes: mockQuotes,
      });

      const { getByText, getByRole, getAllByRole, getByTestId } = renderWithRedux(<DashboardPage />, store);

      expect(getByText("Let's Pump Some Iron!")).toBeInTheDocument();
      expect(getByTestId('rotating-quotes')).toBeInTheDocument();
      expect(getByText('Bench Press')).toBeInTheDocument();
      expect(getByText('Active Exercises')).toBeInTheDocument();
      expect(getAllByRole('button', { name: /Complete Set/i })).toHaveLength(3);
      expect(getAllByRole('button', { name: /Delete Set/i })).toHaveLength(3);
      expect(getByRole('button', { name: /Add Set/i })).toBeInTheDocument();
      expect(getByRole('button', { name: /Delete Exercise/i })).toBeInTheDocument();
      expect(getByRole('button', { name: /Add Exercise/i })).toBeInTheDocument();
    });

    it('allows completing and uncompleting a set', async () => {
      const store = createMockStore({
        exercises: [activeExercise],
        quotes: mockQuotes,
      });

      const { getByText, getAllByRole, getAllByPlaceholderText } = renderWithRedux(<DashboardPage />, store);

      expect(getByText('1/3')).toBeInTheDocument();

      const firstCompleteButton = getAllByRole('button', { name: /Complete Set/i })[0];

      await user.click(firstCompleteButton);
      expect(getByText('2/3')).toBeInTheDocument();
      expect(getAllByPlaceholderText('Reps')[0]).toBeDisabled();
      expect(getAllByPlaceholderText('Weight')[0]).toBeDisabled();

      const updatedFirstCompleteButton = getAllByRole('button', { name: /Complete Set/i })[0];
      expect(updatedFirstCompleteButton).toHaveTextContent('Uncomplete Set');

      await user.click(updatedFirstCompleteButton);

      expect(getByText('1/3')).toBeInTheDocument();
      expect(getAllByPlaceholderText('Reps')[0]).not.toBeDisabled();
      expect(getAllByPlaceholderText('Weight')[0]).not.toBeDisabled();
    });

    it('allows adding a set', async () => {
      const store = createMockStore({
        exercises: [activeExercise],
        quotes: mockQuotes,
      });

      const { getByText, getByRole, getAllByPlaceholderText } = renderWithRedux(<DashboardPage />, store);

      expect(getByText('1/3')).toBeInTheDocument();
      const weightsInputs = getAllByPlaceholderText('Weight');
      const repsInputs = getAllByPlaceholderText('Reps');

      expect(weightsInputs).toHaveLength(3);
      expect(repsInputs).toHaveLength(3);

      const addSetButton = getByRole('button', { name: /Add Set/i });
      await user.click(addSetButton);

      expect(getByText('1/4')).toBeInTheDocument();
      const updatedWeightsInputs = getAllByPlaceholderText('Weight');
      const updatedRepsInputs = getAllByPlaceholderText('Reps');

      expect(updatedWeightsInputs).toHaveLength(4);
      expect(updatedRepsInputs).toHaveLength(4);
    });

    it('allows deleting a set', async () => {
      const store = createMockStore({
        exercises: [activeExercise],
        quotes: mockQuotes,
      });

      const { getByText, getAllByRole, getAllByPlaceholderText } = renderWithRedux(<DashboardPage />, store);

      expect(getByText('1/3')).toBeInTheDocument();
      const weightsInputs = getAllByPlaceholderText('Weight');
      const repsInputs = getAllByPlaceholderText('Reps');

      expect(weightsInputs).toHaveLength(3);
      expect(repsInputs).toHaveLength(3);

      const deleteSetButton = getAllByRole('button', { name: /Delete Set/i })[0];
      await user.click(deleteSetButton);

      expect(getByText('1/2')).toBeInTheDocument();
      const updatedWeightsInputs = getAllByPlaceholderText('Weight');
      const updatedRepsInputs = getAllByPlaceholderText('Reps');

      expect(updatedWeightsInputs).toHaveLength(2);
      expect(updatedRepsInputs).toHaveLength(2);
    });

    it('allows deleting an exercise', async () => {
      const store = createMockStore({
        exercises: [activeExercise],
        quotes: mockQuotes,
      });

      const { getByText, getByRole } = renderWithRedux(<DashboardPage />, store);

      expect(getByText('1/3')).toBeInTheDocument();

      const deleteExerciseButton = getByRole('button', { name: /Delete Exercise/i });
      await user.click(deleteExerciseButton);

      expect(getByText('No active exercises!')).toBeInTheDocument();
      expect(getByText('Add an exercise to get started')).toBeInTheDocument();
    });

    it('allows adding an exercise', async () => {
      const store = createMockStore({
        exercises: [activeExercise],
        quotes: mockQuotes,
      });

      const { getByText, getByRole, getByPlaceholderText } = renderWithRedux(<DashboardPage />, store);

      expect(getByText('1/3')).toBeInTheDocument();

      const addExerciseButton = getByRole('button', { name: /Add Exercise/i });
      await user.click(addExerciseButton);

      const nameInput = getByPlaceholderText('Exercise Name');
      await user.type(nameInput, 'Triceps Extension');

      const saveExerciseButton = getByRole('button', { name: /Save Exercise/i });
      await user.click(saveExerciseButton);

      expect(getByText('0/4')).toBeInTheDocument();
      expect(getByText('Triceps Extension')).toBeInTheDocument();
    });

    it('allows completing an exercise', async () => {
      const store = createMockStore({
        exercises: [activeExercise],
        quotes: mockQuotes,
      });

      const { getByText, getByTestId, queryByText } = renderWithRedux(<DashboardPage />, store);

      expect(getByText('1/3')).toBeInTheDocument();
      expect(getByText('Bench Press')).toBeInTheDocument();

      const completeExerciseButton = getByTestId('completed-checkbox');
      await user.click(completeExerciseButton);

      expect(queryByText('Bench Press')).not.toBeInTheDocument();
      expect(getByText('No active exercises!')).toBeInTheDocument();
      expect(getByText('Add an exercise to get started')).toBeInTheDocument();
    });
  });

  describe('when there are no active exercises', () => {
    const mockQuotes: IQuote[] = [
      { text: 'Test quote 1', author: 'Author 1' },
      { text: 'Test quote 2', author: 'Author 2' },
    ];

    it('renders the page title and quotes, but no exercises', () => {
      const store = createMockStore({
        exercises: [],
        quotes: mockQuotes,
      });

      const { getByText, getByTestId } = renderWithRedux(<DashboardPage />, store);

      expect(getByText("Let's Pump Some Iron!")).toBeInTheDocument();
      expect(getByTestId('rotating-quotes')).toBeInTheDocument();
      expect(getByText('No active exercises!')).toBeInTheDocument();
      expect(getByText('Add an exercise to get started')).toBeInTheDocument();
    });
  });
});
