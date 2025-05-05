import { describe, expect, it, vi } from 'vitest';

import { QuotesCarousel } from '../QuotesCarousel';
import { RotatingQuotes } from '../RotatingQuotes';

import type { IQuote } from '@/types/quote';

import { renderWithRedux } from '@/lib/testUtils';
import { makeStore } from '@/redux/store';
import { RequestStatuses } from '@/types/requestStatuses';

vi.mock('@/components/rotating-quotes/QuotesCarousel', () => ({
  QuotesCarousel: vi.fn(() => <div data-testid="quotes-carousel" />),
}));

vi.mock('@/components/rotating-quotes/RotatingQuotesSkeleton', () => ({
  RotatingQuotesSkeleton: vi.fn(() => <div data-testid="skeleton" />),
}));

describe('RotatingQuotes', () => {
  const mockQuotes: IQuote[] = [
    { text: 'Test quote 1', author: 'Author 1' },
    { text: 'Test quote 2', author: 'Author 2' },
  ];

  it('shows skeleton while loading', () => {
    const store = makeStore({
      quotes: { quotes: [], status: RequestStatuses.loading, error: null },
    });

    const { getByTestId } = renderWithRedux(<RotatingQuotes />, store);

    expect(getByTestId('skeleton')).toBeInTheDocument();
  });

  it('shows carousel when quotes are loaded', () => {
    const store = makeStore({
      quotes: { quotes: mockQuotes, status: RequestStatuses.succeeded, error: null },
    });

    const { getByTestId } = renderWithRedux(<RotatingQuotes />, store);

    expect(getByTestId('quotes-carousel')).toBeInTheDocument();
    expect(vi.mocked(QuotesCarousel)).toHaveBeenCalledWith(
      expect.objectContaining({
        quotes: mockQuotes,
      }),
      expect.any(Object)
    );
  });

  it('shows error message when quotes fetch fails', () => {
    const store = makeStore({
      quotes: { quotes: [], status: RequestStatuses.failed, error: 'Failed to fetch quotes' },
    });

    const { getByText } = renderWithRedux(<RotatingQuotes />, store);

    expect(getByText('There was an error fetching the quotes')).toBeInTheDocument();
  });
});
