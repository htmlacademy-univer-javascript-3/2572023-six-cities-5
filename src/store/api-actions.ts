import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppDispatch, State } from '@typings/state';
import { Offer, Offers } from '@typings/offer';
import {saveToken, dropToken} from '@services/token';
import {APIRoute, AuthorizationStatus } from '@const';
import {AuthData} from '@typings/auth-data';
import { Review, Reviews, User } from '@typings/review';
import { OfferInDetails } from '@typings/offerInDetails';
import { ReviewFormData } from '@typings/review-form-data';
import { loadOffers, setOffersDataLoadingStatus, updateFavorites } from './offers-data/offers-data';
import { loadOfferInDetails, sendReview, setOfferInDetailsDataLoadingStatus } from './current-offer-data/current-offer-data';
import { setAuthorizationStatus, setUserEmail } from './user-process/user-process';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data: response } = await api.get<Offers>(APIRoute.Offers);
      dispatch(loadOffers(response));
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);


export const fetchOfferInDetailsAction = createAsyncThunk<void,
  {
    id: string;
  },
  { dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/fetchOfferInDetails',
    async ({ id }, { dispatch, extra: api }) => {
      dispatch(setOfferInDetailsDataLoadingStatus(true));

      try {
        const { data: offerInfo } = await api.get<OfferInDetails>(`${APIRoute.Offers}/${id}`);
        const { data: nearestOffers } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
        const { data: reviews } = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);

        dispatch(loadOfferInDetails({ offerInfo, nearestOffers, reviews }));
      } finally {
        dispatch(setOfferInDetailsDataLoadingStatus(false));
      }
    }
  );


export const sendReviewAction = createAsyncThunk<void,
  {
    review: ReviewFormData;
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'user/sendReview',
    async ({ review, id }, { dispatch, extra: api }) => {
      const { data: responseReview } = await api.post<Review>(`${APIRoute.Comments}/${id}`,
        {
          comment: review.review,
          rating: review.rating,
        });
      dispatch(sendReview(responseReview));
    });

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const response = await api.get(APIRoute.Login);
      const data = response.data as { email: string };
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserEmail(data.email));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<User>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserEmail(email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(fetchOffersAction());
  },
);

export const toggleFavoriteStatusAction = createAsyncThunk<void,
  { id: string; isFavorite: boolean },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'offer/toggleFavoriteStatus',
    async ({ id, isFavorite }, { dispatch, extra: api }) => {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${isFavorite ? 1 : 0}`);
      dispatch(updateFavorites({ id: data.id, isFavorite: data.isFavorite }));
    }
  );
