import { render } from '@testing-library/react';
import { Quote } from './Quote';

describe('Quote Component', () => {
  it('should render the quote', () => {
    const { getByText } = render(<Quote text="Test Quote" author="Test Author" />);
    expect(getByText('Test Quote')).toBeInTheDocument();
    expect(getByText('— Test Author')).toBeInTheDocument();
  });

  it('should not render the author if it is not provided', () => {
    const { queryByText } = render(<Quote text="Test Quote" />);
    expect(queryByText('— Test Author')).not.toBeInTheDocument();
  });
});
