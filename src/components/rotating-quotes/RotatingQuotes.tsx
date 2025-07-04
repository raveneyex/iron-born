import { useEffect } from 'react';

import { QuotesCarousel } from './QuotesCarousel';
import { RotatingQuotesSkeleton } from './RotatingQuotesSkeleton';

import type { IQuote } from '@/types/quote';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchQuotes, selectQuotes, selectStatus } from '@/redux/slices/quotesSlice';
import { RequestStatuses } from '@/types/requestStatuses';

export function RotatingQuotes() {
  const dispatch = useAppDispatch();

  const quotes: IQuote[] = useAppSelector(selectQuotes);
  const status: string = useAppSelector(selectStatus);

  const isLoading = status === RequestStatuses.idle || status === RequestStatuses.loading;

  useEffect(() => {
    if (status === RequestStatuses.idle) {
      dispatch(fetchQuotes());
    }
  }, [dispatch, status]);

  return (
    <div className="w-full md:max-w-sm py-5">
      {isLoading && <RotatingQuotesSkeleton />}
      {status === RequestStatuses.succeeded && <QuotesCarousel quotes={quotes} />}
      {status === RequestStatuses.failed && <div>There was an error fetching the quotes</div>}
    </div>
  );
}
