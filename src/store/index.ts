import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { checkAuthAction, fetchOffersAction } from './api-actions';
import { redirect } from './middlewares/redirect';

export const api = createAPI();

export const appStateStore = configureStore(
  {
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }).concat(redirect),
  },
);

appStateStore.dispatch(fetchOffersAction());
appStateStore.dispatch(checkAuthAction());

export type AppDispatch = typeof appStateStore.dispatch;
