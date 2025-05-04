import { renderWithRedux } from '@/lib/testUtils';
import { exercisesSlice } from '@/redux/slices/exercisesSlice';
import { IExercise } from '@/types/exercise';
import { configureStore } from '@reduxjs/toolkit';
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CompletedExercisesTable } from '../CompletedExercisesTable';

const user = userEvent.setup();

const mockCompletedExercises: IExercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    sets: [
      { id: '1', weight: 60, reps: 10, completed: true },
      { id: '2', weight: 60, reps: 8, completed: true },
    ],
    weightUnits: 'kg',
    dateCompleted: 1714857600000 - 1000 * 60 * 60 * 24,
    totalSets: 2,
    status: 'completed',
    totalReps: 18,
    totalWeight: 120,
  },
  {
    id: '2',
    name: 'Squats',
    sets: [
      { id: '3', weight: 100, reps: 12, completed: true },
      { id: '4', weight: 100, reps: 10, completed: true },
      { id: '5', weight: 100, reps: 8, completed: true },
    ],
    weightUnits: 'kg',
    dateCompleted: 1714857600000,
    totalSets: 3,
    status: 'completed',
    totalReps: 30,
    totalWeight: 300,
  },
];

const createMockStore = (completedExercises = mockCompletedExercises) => {
  return configureStore({
    reducer: {
      exercises: exercisesSlice.reducer,
    },
    preloadedState: {
      exercises: {
        exercises: completedExercises,
      },
    },
  });
};

describe('CompletedExercisesTable', () => {
  it('renders the table with correct number of rows', () => {
    const { getAllByRole } = renderWithRedux(<CompletedExercisesTable />, createMockStore());

    const rows = getAllByRole('row');

    expect(rows).toHaveLength(mockCompletedExercises.length + 1);
  });

  it('displays all columns correctly', () => {
    const { getAllByRole } = renderWithRedux(<CompletedExercisesTable />, createMockStore());

    const headers = getAllByRole('columnheader');
    expect(headers).toHaveLength(6);

    const firstRow = getAllByRole('row')[1];
    const firstExercise = mockCompletedExercises[0];

    expect(within(firstRow).getByText(firstExercise.name)).toBeInTheDocument();
    expect(within(firstRow).getByText(firstExercise.sets.length.toString())).toBeInTheDocument();
    expect(within(firstRow).getByText('18')).toBeInTheDocument();
    expect(within(firstRow).getByText('120 kg')).toBeInTheDocument();
    expect(within(firstRow).getByText('5/3/2024')).toBeInTheDocument();
  });

  it('handles empty state correctly', () => {
    const { getAllByRole } = renderWithRedux(<CompletedExercisesTable />, createMockStore([]));

    const rows = getAllByRole('row');
    expect(rows).toHaveLength(2);

    const contentRow = rows[1];
    expect(within(contentRow).getByText('No exercises completed yet.')).toBeInTheDocument();
  });

  it('sorts by exercise name when header is clicked', async () => {
    const { getByRole, getAllByRole } = renderWithRedux(<CompletedExercisesTable />, createMockStore());

    const exerciseHeader = getByRole('button', { name: /Exercise/i });
    expect(exerciseHeader).toBeInTheDocument();
    await user.click(exerciseHeader);

    const rows = getAllByRole('row');
    const firstRow = rows[1];
    expect(within(firstRow).getByText('Bench Press')).toBeInTheDocument();

    await user.click(exerciseHeader);

    const updatedRows = getAllByRole('row');
    const updatedFirstRow = updatedRows[1];
    expect(within(updatedFirstRow).getByText('Squats')).toBeInTheDocument();
  });

  it('sorts by sets when header is clicked', async () => {
    const { getByRole, getAllByRole } = renderWithRedux(<CompletedExercisesTable />, createMockStore());

    const setsHeader = getByRole('button', { name: /Sets/i });
    expect(setsHeader).toBeInTheDocument();
    await user.click(setsHeader);

    const rows = getAllByRole('row');
    const firstRow = rows[1];
    expect(within(firstRow).getByText('Bench Press')).toBeInTheDocument();
    expect(within(firstRow).getByText('2')).toBeInTheDocument();

    await user.click(setsHeader);

    const updatedRows = getAllByRole('row');
    const updatedFirstRow = updatedRows[1];
    expect(within(updatedFirstRow).getByText('Squats')).toBeInTheDocument();
    expect(within(updatedFirstRow).getByText('3')).toBeInTheDocument();
  });

  it('sorts by total reps when header is clicked', async () => {
    const { getByRole, getAllByRole } = renderWithRedux(<CompletedExercisesTable />, createMockStore());

    const repsHeader = getByRole('button', { name: /Total Reps/i });
    expect(repsHeader).toBeInTheDocument();
    await user.click(repsHeader);

    const rows = getAllByRole('row');
    const firstRow = rows[1];
    expect(within(firstRow).getByText('18')).toBeInTheDocument();
    expect(within(firstRow).getByText('Bench Press')).toBeInTheDocument();

    await user.click(repsHeader);

    const updatedRows = getAllByRole('row');
    const updatedFirstRow = updatedRows[1];
    expect(within(updatedFirstRow).getByText('30')).toBeInTheDocument();
    expect(within(updatedFirstRow).getByText('Squats')).toBeInTheDocument();
  });

  it('sorts by total weight when header is clicked', async () => {
    const { getByRole, getAllByRole } = renderWithRedux(<CompletedExercisesTable />, createMockStore());

    const totalWeightHeader = getByRole('button', { name: /Total Weight/i });
    expect(totalWeightHeader).toBeInTheDocument();
    await user.click(totalWeightHeader);

    const rows = getAllByRole('row');
    const firstRow = rows[1];
    expect(within(firstRow).getByText('120 kg')).toBeInTheDocument();
    expect(within(firstRow).getByText('Bench Press')).toBeInTheDocument();

    await user.click(totalWeightHeader);

    const updatedRows = getAllByRole('row');
    const updatedFirstRow = updatedRows[1];
    expect(within(updatedFirstRow).getByText('300 kg')).toBeInTheDocument();
    expect(within(updatedFirstRow).getByText('Squats')).toBeInTheDocument();
  });

  it('sorts by date when header is clicked', async () => {
    const { getByRole, getAllByRole } = renderWithRedux(<CompletedExercisesTable />, createMockStore());

    const dateHeader = getByRole('button', { name: /Date/i });
    expect(dateHeader).toBeInTheDocument();
    await user.click(dateHeader);

    const rows = getAllByRole('row');
    const firstRow = rows[1];
    expect(within(firstRow).getByText('5/3/2024')).toBeInTheDocument();
    expect(within(firstRow).getByText('Bench Press')).toBeInTheDocument();

    await user.click(dateHeader);

    const updatedRows = getAllByRole('row');
    const updatedFirstRow = updatedRows[1];
    expect(within(updatedFirstRow).getByText('5/4/2024')).toBeInTheDocument();
    expect(within(updatedFirstRow).getByText('Squats')).toBeInTheDocument();
  });

  it('deletes an exercise when the delete button is clicked', async () => {
    const { getAllByRole } = renderWithRedux(<CompletedExercisesTable />, createMockStore());

    const rows = getAllByRole('row');
    const firstRow = rows[1];
    expect(within(firstRow).getByText('Bench Press')).toBeInTheDocument();

    const firstDeleteButton = within(firstRow).getByRole('button');
    await user.click(firstDeleteButton);

    expect(rows).toHaveLength(mockCompletedExercises.length + 1); // header is a row

    const updatedRows = getAllByRole('row');
    const updatedFirstRow = updatedRows[1];
    expect(within(updatedFirstRow).getByText('Squats')).toBeInTheDocument();
  });
});
