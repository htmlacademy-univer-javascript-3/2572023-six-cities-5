import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '@const';
import { CurrentOfferData } from '@typings/state';
import { OfferInDetails } from '@typings/offerInDetails';
import { Offers } from '@typings/offer';
import { Review, Reviews } from '@typings/review';

const initialState: CurrentOfferData = {
  offerInfo: null,
  nearbyOffers: [],
  reviews: [],
  isOfferInDetailsDataLoading: false,
};

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    loadOfferInDetails: (state, action: PayloadAction<{ offerInfo: OfferInDetails; nearestOffers: Offers; reviews: Reviews }>) => {
      state.offerInfo = action.payload.offerInfo;
      state.nearbyOffers = action.payload.nearestOffers;
      state.reviews = action.payload.reviews;
    },
    sendReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    setOfferInDetailsDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOfferInDetailsDataLoading = action.payload;
    },
  },
});

export const { loadOfferInDetails, sendReview, setOfferInDetailsDataLoadingStatus } = currentOfferData.actions;
