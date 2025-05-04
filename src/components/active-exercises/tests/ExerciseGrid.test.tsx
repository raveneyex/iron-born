import { ActiveExercise } from '@/types/exercise';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ExerciseGrid } from '../ExerciseGrid';

vi.mock('../ExerciseCard', () => ({
  ExerciseCard: ({ exercise }: { exercise: ActiveExercise }) => (
    <div data-testid="exercise-card" data-exercise-id={exercise.id} data-exercise-name={exercise.name}>
      {exercise.name}
    </div>
  ),
}));

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

describe('ExerciseGrid', () => {
  it('renders the correct number of exercise cards', () => {
    const { getAllByTestId } = render(<ExerciseGrid exercises={mockExercises} />);
    const exerciseCards = getAllByTestId('exercise-card');
    expect(exerciseCards).toHaveLength(mockExercises.length);
  });

  it('passes the correct exercise data to each card', () => {
    const { getAllByTestId } = render(<ExerciseGrid exercises={mockExercises} />);
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
});
