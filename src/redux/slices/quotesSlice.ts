import { QuotesService } from '@/services/quotesService';
import { IQuote } from '@/types/quote';
import { RequestStatus, RequestStatuses } from '@/types/requestStatuses';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type QuotesSliceState = {
  quotes: IQuote[];
  status: RequestStatus;
  error: string | null;
};

const initialState: QuotesSliceState = {
  quotes: [],
  status: RequestStatuses.idle,
  error: null,
};

export const fetchQuotes = createAsyncThunk<IQuote[], void, { rejectValue: string }>(
  'quotes/fetchQuotes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await QuotesService.getInstance().getQuotes();
      return response;
    } catch (error: unknown) {
      console.error('Error fetching quotes:', error);
      return rejectWithValue('Failed to fetch quotes');
    }
  }
);

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuotes.pending, (state) => {
      state.status = RequestStatuses.loading;
    });
    builder.addCase(fetchQuotes.fulfilled, (state, action) => {
      state.status = RequestStatuses.succeeded;
      state.quotes = action.payload;
    });
    builder.addCase(fetchQuotes.rejected, (state, action) => {
      state.status = RequestStatuses.failed;
      state.error = action.payload ?? 'Unknown error occurred';
    });
  },
  selectors: {
    selectQuotes: (state) => state.quotes,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { selectQuotes, selectStatus, selectError } = quotesSlice.selectors;
