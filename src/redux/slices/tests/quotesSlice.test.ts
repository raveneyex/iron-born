import { describe, expect, it, vi } from 'vitest';

import { fetchQuotes, quotesSlice } from '../quotesSlice';

import type { IQuote } from '@/types/quote';

import { RequestStatuses } from '@/types/requestStatuses';

vi.mock('@/services/quotesService', () => ({
  QuotesService: {
    getInstance: vi.fn().mockReturnValue({
      getQuotes: vi.fn(),
    }),
  },
}));

describe('quotesSlice', () => {
  const initialState = {
    quotes: [],
    status: RequestStatuses.idle,
    error: null,
  };

  describe('fetchQuotes thunk', () => {
    it('should handle pending state', () => {
      const action = { type: fetchQuotes.pending.type };
      const state = quotesSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatuses.loading);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const mockQuotes: IQuote[] = [
        { text: 'Test quote 1', author: 'Author 1' },
        { text: 'Test quote 2', author: 'Author 2' },
      ];

      const action = {
        type: fetchQuotes.fulfilled.type,
        payload: mockQuotes,
      };

      const state = quotesSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatuses.succeeded);
      expect(state.quotes).toEqual(mockQuotes);
      expect(state.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to fetch quotes';
      const action = {
        type: fetchQuotes.rejected.type,
        payload: errorMessage,
      };

      const state = quotesSlice.reducer(initialState, action);

      expect(state.status).toBe(RequestStatuses.failed);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('selectors', () => {
    const mockState = {
      quotes: {
        quotes: [
          { text: 'Test quote 1', author: 'Author 1' },
          { text: 'Test quote 2', author: 'Author 2' },
        ],
        status: RequestStatuses.succeeded,
        error: null,
      },
    };

    describe('selectQuotes', () => {
      it('should return the quotes array', () => {
        const result = quotesSlice.selectors.selectQuotes(mockState);
        expect(result).toEqual(mockState.quotes.quotes);
      });

      it('should return empty array when no quotes', () => {
        const emptyState = {
          quotes: {
            quotes: [],
            status: RequestStatuses.idle,
            error: null,
          },
        };
        const result = quotesSlice.selectors.selectQuotes(emptyState);
        expect(result).toEqual([]);
      });
    });

    describe('selectStatus', () => {
      it('should return the current status', () => {
        const result = quotesSlice.selectors.selectStatus(mockState);
        expect(result).toBe(RequestStatuses.succeeded);
      });

      it('should return idle status when no request made', () => {
        const idleState = {
          quotes: {
            quotes: [],
            status: RequestStatuses.idle,
            error: null,
          },
        };
        const result = quotesSlice.selectors.selectStatus(idleState);
        expect(result).toBe(RequestStatuses.idle);
      });
    });

    describe('selectError', () => {
      it('should return null when no error', () => {
        const result = quotesSlice.selectors.selectError(mockState);
        expect(result).toBeNull();
      });

      it('should return error message when request fails', () => {
        const errorState = {
          quotes: {
            quotes: [],
            status: RequestStatuses.failed,
            error: 'Failed to fetch quotes',
          },
        };
        const result = quotesSlice.selectors.selectError(errorState);
        expect(result).toBe('Failed to fetch quotes');
      });
    });
  });
});
