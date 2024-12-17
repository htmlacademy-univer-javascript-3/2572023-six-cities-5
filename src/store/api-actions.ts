import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { AppState } from './reducer';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { addReview, clearFavorites, redirectToRoute, setAuthorizationStatus, setFavoriteOffers, setOffer, setOffers, setOffersLoadingStatus, setReviewFormIsSending, setSelectedOffer, setSelectedOfferLoadingStatus, setUserData, updateComment } from './action';
import { dropToken, saveToken } from '../services/token';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { OfferDetails } from '../types/offer-details';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { ReviewAction } from '../types/review-action';
import { FavoriteAction } from '../types/favorite-action';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      dispatch(setOffersLoadingStatus(true));
      dispatch(setSelectedOffer(undefined));

      const { data } = await api.get<Offer[]>(APIRoute.Offers);

      dispatch(setOffersLoadingStatus(false));
      dispatch(setOffers(data));
    } catch {
      dispatch(setOffersLoadingStatus(false));
    }
  },
);

export const fetchOfferDetailsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOfferDetails',
  async (offerId: string, { dispatch, extra: api }) => {
    dispatch(setSelectedOfferLoadingStatus(true));

    try {
      const offerData = await api.get<Offer>(APIRoute.OfferDetails.replace(':id', offerId));
      const reviewsData = await api.get<Review[]>(APIRoute.OfferReviews.replace(':id', offerId));
      const offersNearbyData = await api.get<Offer[]>(APIRoute.OffersNearby.replace(':id', offerId));

      const offerDetails: OfferDetails = {
        offer: offerData.data,
        reviews: reviewsData.data.sort((a: Review, b: Review) => (new Date(b.date).getTime() - new Date(a.date).getTime())),
        offersNearby: offersNearbyData.data,
        isReviewFormSending: false,
      };

      dispatch(setSelectedOfferLoadingStatus(false));
      dispatch(setSelectedOffer(offerDetails));
    } catch {
      dispatch(setSelectedOfferLoadingStatus(false));
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchFavoriteOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      dispatch(setFavoriteOffers(data));
    } catch {
      ///
    }
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<void, FavoriteAction, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/setFavoriteStatus',
  async ({ offerId: offerId, status }, { dispatch, extra: api }) => {
    const numberStatus = status ? 1 : 0;
    const route = APIRoute.ChangeFavoriteStatus
      .replace(':id', offerId)
      .replace(':status', numberStatus.toString());

    const { data } = await api.post<Offer>(route);

    dispatch(setOffer(data));
  }
);

export const addReviewAction = createAsyncThunk<void, ReviewAction, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({ offerId: offerId, comment, rating }, { dispatch, extra: api }) => {
    dispatch(setReviewFormIsSending(true));
    const route = APIRoute.OfferReviews.replace(':id', offerId);
    await new Promise((res) => setTimeout(res, 3000));
    const { data } = await api.post<Review>(route, { comment: comment, rating: rating });

    dispatch(addReview(data));
    dispatch(updateComment(''));
    dispatch(setReviewFormIsSending(false));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/checkAuthorizationStatus',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);

      dispatch(setUserData(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(fetchFavoriteOffersAction());
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);

      dispatch(setUserData(data));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(fetchFavoriteOffersAction());
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (err) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
    } catch (err) {
      ///
    }

    dropToken();
    dispatch(setUserData(undefined));
    dispatch(clearFavorites());
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  },
);
