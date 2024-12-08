import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../../api/api';
import { fetchOffersAction } from './api-actions';

export const api = createAPI();

export const appStateStore = configureStore(
  {
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  },
);

appStateStore.dispatch(fetchOffersAction());

export type AppDispatch = typeof appStateStore.dispatch;
