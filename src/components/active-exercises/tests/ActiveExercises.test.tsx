import { renderWithRedux } from '@/lib/testUtils';
import { exercisesSlice } from '@/redux/slices/exercisesSlice';
import { ActiveExercise } from '@/types/exercise';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ActiveExercises } from '../ActiveExercises';

vi.mock('../../services/storageService', () => ({
  StorageService: {
    getInstance: jest.fn().mockReturnValue({
      getExercises: jest.fn(),
      setExercises: jest.fn(),
    }),
  },
}));

const mockActiveExercises: ActiveExercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    status: 'active',
    totalSets: 3,
    currentSet: 1,
    weightUnits: 'kg',
    sets: [],
  },
  {
    id: '2',
    name: 'Squats',
    status: 'active',
    totalSets: 4,
    currentSet: 2,
    weightUnits: 'kg',
    sets: [],
  },
];

const createMockStore = (exercises: ActiveExercise[] = mockActiveExercises) => {
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

describe('ActiveExercises', () => {
  it('renders the title and add exercise button', () => {
    const { getByText } = renderWithRedux(<ActiveExercises />, createMockStore());
    expect(getByText('Active Exercises')).toBeInTheDocument();
    expect(getByText('Add Exercise')).toBeInTheDocument();
  });

  it('renders the exercise grid when there are active exercises', () => {
    const { getByText } = renderWithRedux(<ActiveExercises />, createMockStore());
    expect(getByText('Bench Press')).toBeInTheDocument();
    expect(getByText('Squats')).toBeInTheDocument();
  });

  it('shows empty state when there are no active exercises', () => {
    const { getByText } = renderWithRedux(<ActiveExercises />, createMockStore([]));

    expect(getByText('No active exercises!')).toBeInTheDocument();
    expect(getByText('Add an exercise to get started')).toBeInTheDocument();
  });

  it('opens the add exercise dialog when clicking the add button', () => {
    const { getByText, getByRole } = renderWithRedux(<ActiveExercises />, createMockStore());
    const addButton = getByText('Add Exercise');
    fireEvent.click(addButton);

    expect(getByRole('dialog')).toBeInTheDocument();
  });

  it('opens the add exercise dialog when clicking the empty state link', () => {
    const { getByText, getByRole } = renderWithRedux(<ActiveExercises />, createMockStore([]));

    const addLink = getByText('Add an exercise to get started');
    fireEvent.click(addLink);

    expect(getByRole('dialog')).toBeInTheDocument();
  });
});
