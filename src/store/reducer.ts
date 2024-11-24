import { createReducer } from '@reduxjs/toolkit';
import {OffersInDetails} from '../types/offer-details.ts';
import {Offers} from '../types/offer.ts';
import {Reviews} from '../types/reviews.ts';
import {changeCity, setOffersInDetails, setOffersList, setReviews} from './action.ts';
import {reviews} from '../mocks/reviews.ts';
import {offers} from '../mocks/offers.ts';
import {offersInDetails} from '../mocks/offerInDetails.ts';

type StateType = {
  city: string;
  offersList: Offers;
  reviews: Reviews;
  offersInDetails: OffersInDetails;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  reviews: [],
  offersInDetails: []
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setOffersList, (state) => {
      state.offersList = offers;
    })
    .addCase(setReviews, (state) => {
      state.reviews = reviews;
    })
    .addCase(setOffersInDetails, (state) => {
      state.offersInDetails = offersInDetails;
    });
});
