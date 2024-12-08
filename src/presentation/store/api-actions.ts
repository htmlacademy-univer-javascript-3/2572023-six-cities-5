import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { AppState } from './reducer';
import { AxiosInstance } from 'axios';
import { Offer } from '../../domain/models/offer';
import { APIRoute } from '../../const';
import { setOffers, setOffersLoadingStatus, setSelectedOffer, setSelectedOfferLoadingStatus } from './action';
import { Review } from '../../domain/models/review';
import { OfferDetails } from '../../domain/models/offer-details';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: AppState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(true));
    dispatch(setSelectedOffer(undefined));

    const { data } = await api.get<Offer[]>(APIRoute.Offers);

    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
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

    const offerData = await api.get<Offer>(APIRoute.OfferDetails.replace(':id', offerId));
    const reviewsData = await api.get<Review[]>(APIRoute.OfferReviews.replace(':id', offerId));
    const offersNearbyData = await api.get<Offer[]>(APIRoute.OffersNearby.replace(':id', offerId));

    const offerDetails: OfferDetails = {
      offer: offerData.data,
      reviews: reviewsData.data,
      offersNearby: offersNearbyData.data,
    };

    dispatch(setSelectedOfferLoadingStatus(false));
    dispatch(setSelectedOffer(offerDetails));
  },
);
