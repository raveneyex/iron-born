import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { WeightUnitsSelect } from '../WeightUnitsSelect';

describe('WeightUnitsSelect', () => {
  it('renders with initial value', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<WeightUnitsSelect weightUnits="kg" onChange={onChange} />);

    const trigger = getByRole('combobox');
    expect(trigger).toHaveTextContent('kg');
  });

  it('renders all options', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<WeightUnitsSelect weightUnits="kg" onChange={onChange} />);

    const trigger = getByRole('combobox');
    fireEvent.click(trigger);

    expect(getByRole('option', { name: 'kg' })).toBeInTheDocument();
    expect(getByRole('option', { name: 'lbs' })).toBeInTheDocument();
  });

  it('calls onChange with new value when option is selected', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<WeightUnitsSelect weightUnits="kg" onChange={onChange} />);

    const trigger = getByRole('combobox');
    fireEvent.click(trigger);

    const lbsOption = getByRole('option', { name: 'lbs' });
    fireEvent.click(lbsOption);

    expect(onChange).toHaveBeenCalledWith('lbs');
  });
});
