import { fireEvent, render } from '@testing-library/react';
import { vi } from 'vitest';
import { AddExerciseDialog } from '../AddExerciseDialog';

describe('AddExerciseDialog', () => {
  const mockSetOpen = vi.fn();
  const mockOnAddExercise = vi.fn();
  const defaultProps = {
    open: false,
    setOpen: mockSetOpen,
    onAddExercise: mockOnAddExercise,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the dialog trigger button', () => {
    const { getByText } = render(<AddExerciseDialog {...defaultProps} />);
    expect(getByText('Add Exercise')).toBeInTheDocument();
  });

  it('opens the dialog when the trigger button is clicked', () => {
    const { getByText } = render(<AddExerciseDialog {...defaultProps} />);
    const triggerButton = getByText('Add Exercise');
    fireEvent.click(triggerButton);
    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });

  it('closes the dialog when open state is false', () => {
    const { queryByText } = render(<AddExerciseDialog {...defaultProps} />);
    expect(queryByText('Add a new exercise')).not.toBeInTheDocument();
  });

  it('shows the dialog content when open', () => {
    const { getByText } = render(<AddExerciseDialog {...defaultProps} open={true} />);
    expect(getByText('Add a new exercise')).toBeInTheDocument();
    expect(getByText('Fields marked with (*) are mandatory.')).toBeInTheDocument();
  });

  it('calls setOpen with false when dialog is closed', () => {
    const { getByRole } = render(<AddExerciseDialog {...defaultProps} open={true} />);
    const closeButton = getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
