import { renderWithRedux } from '@/lib/testUtils';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent } from '@testing-library/react';
import { toast } from 'sonner';
import { describe, expect, it, vi } from 'vitest';
import { DeleteExerciseButton } from '../DeleteExerciseButton';

// Mock the toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
}));

// Mock the store with actual mock data
const mockStore = configureStore({
  reducer: {
    exercises: () => ({
      exercises: [{ id: '123', name: 'Test Exercise' }],
    }),
  },
});

describe('DeleteExerciseButton', () => {
  const defaultProps = {
    exerciseId: '123',
    exerciseName: 'Test Exercise',
  };

  it('renders with default variant', () => {
    const { getByRole } = renderWithRedux(<DeleteExerciseButton {...defaultProps} />, mockStore);

    const button = getByRole('button', { name: /delete exercise/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders with icon variant', () => {
    const { getByRole } = renderWithRedux(<DeleteExerciseButton {...defaultProps} variant="icon" />, mockStore);

    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('dispatches delete action and shows toast on click', () => {
    const { getByRole } = renderWithRedux(<DeleteExerciseButton {...defaultProps} />, mockStore);

    const button = getByRole('button', { name: /delete exercise/i });
    fireEvent.click(button);

    expect(toast.success).toHaveBeenCalledWith('Test Exercise deleted');
  });
});
