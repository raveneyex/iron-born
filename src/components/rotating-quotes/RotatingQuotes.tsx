import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchQuotes, selectQuotes, selectStatus } from '@/redux/slices/quotesSlice';
import type { IQuote } from '@/types/quote';
import { statuses } from '@/types/status';
import { useEffect } from 'react';
import { QuotesCarousel } from './QuotesCarousel';
import { RotatingQuotesSkeleton } from './RotatingQuotesSkeleton';
export function RotatingQuotes() {
  const dispatch = useAppDispatch();

  const quotes: IQuote[] = useAppSelector(selectQuotes);
  const status: string = useAppSelector(selectStatus);

  const isLoading = status === statuses.idle || status === statuses.loading;

  useEffect(() => {
    dispatch(fetchQuotes());
  }, [dispatch]);

  return (
    <div className="w-full md:max-w-sm py-5">
      {isLoading && <RotatingQuotesSkeleton />}
      {status === statuses.succeeded && <QuotesCarousel quotes={quotes} />}
      {status === statuses.failed && <div>There was an error fetching the quotes</div>}
    </div>
  );
}
