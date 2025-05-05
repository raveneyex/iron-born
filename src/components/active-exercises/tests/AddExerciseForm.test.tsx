import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AddExerciseForm } from '../AddExerciseForm';

describe('AddExerciseForm', () => {
  const mockOnSubmit = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all form fields and submit button', () => {
    const { getByLabelText, getByText, getByRole } = render(<AddExerciseForm onSubmit={mockOnSubmit} />);

    expect(getByLabelText(/Exercise Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Total Sets/i)).toBeInTheDocument();
    expect(getByText(/Weight Units/i)).toBeInTheDocument();
    expect(getByRole('button', { name: /Save Exercise/i })).toBeInTheDocument();
  });

  it('has submit button disabled by default', () => {
    const { getByRole } = render(<AddExerciseForm onSubmit={mockOnSubmit} />);
    const submitButton = getByRole('button', { name: /Save Exercise/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when form is valid and dirty', async () => {
    const { getByRole, getByLabelText } = render(<AddExerciseForm onSubmit={mockOnSubmit} />);
    const submitButton = getByRole('button', { name: /Save Exercise/i });
    const nameInput = getByLabelText(/Exercise Name/i);
    const setsInput = getByLabelText(/Total Sets/i);

    await user.type(nameInput, 'Barbell Bench Press');
    await user.clear(setsInput);
    await user.type(setsInput, '3');

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('calls onSubmit with correct data when form is submitted', async () => {
    const { getByRole, getByLabelText } = render(<AddExerciseForm onSubmit={mockOnSubmit} />);

    const submitButton = getByRole('button', { name: /Save Exercise/i });
    const nameInput = getByLabelText(/Exercise Name/i);
    const setsInput = getByLabelText(/Total Sets/i);

    await user.type(nameInput, 'Barbell Bench Press');
    await user.clear(setsInput);
    await user.type(setsInput, '3');

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Barbell Bench Press',
        totalSets: 3,
        weightUnits: 'kg',
      });
    });
  });

  it('resets form after successful submission', async () => {
    const { getByRole, getByLabelText } = render(<AddExerciseForm onSubmit={mockOnSubmit} />);

    const submitButton = getByRole('button', { name: /Save Exercise/i });
    const nameInput = getByLabelText(/Exercise Name/i);
    const setsInput = getByLabelText(/Total Sets/i);

    await user.type(nameInput, 'Barbell Bench Press');
    await user.clear(setsInput);
    await user.type(setsInput, '3');

    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(setsInput).toHaveValue(4);
    });
  });

  it('shows validation error for exercise name', async () => {
    const { getByLabelText, getByText } = render(<AddExerciseForm onSubmit={mockOnSubmit} />);

    const nameInput = getByLabelText(/Exercise Name/i);
    await user.type(nameInput, 'Bar');
    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(getByText(/Name must be at least 5 characters long/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid total sets', async () => {
    const { getByLabelText, getByText, getByRole } = render(<AddExerciseForm onSubmit={mockOnSubmit} />);

    const nameInput = getByLabelText(/Exercise Name/i);
    const setsInput = getByLabelText(/Total Sets/i);
    const submitButton = getByRole('button', { name: /Save Exercise/i });

    await user.type(nameInput, 'Barbell Bench Press');
    await user.clear(setsInput);
    await user.type(setsInput, '0');
    await user.click(submitButton);

    await waitFor(() => {
      expect(getByText(/Sets must be at least 1/i)).toBeInTheDocument();
    });
  });
});
