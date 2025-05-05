import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { exercisesSlice } from './slices/exercisesSlice';
import { quotesSlice } from './slices/quotesSlice';

const rootReducer = combineSlices(quotesSlice, exercisesSlice);

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
