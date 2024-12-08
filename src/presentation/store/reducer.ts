import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../domain/models/offer';
import { selectCity, selectSorting, setOffers, setOffersLoadingStatus, setSelectedOffer, setSelectedOfferLoadingStatus } from './action';
import { SortType } from '../../domain/models/sort-type';
import { OfferDetails } from '../../domain/models/offer-details';

export type AppState = {
  offers: Offer[];
  cities: string[];
  selectedCity: string;
  sortType: SortType;
  selectedOffer?: OfferDetails;
  isOffersLoading: boolean;
  isSelectedOfferLoading: boolean;
}

const initialState: AppState = {
  offers: [],
  cities: [
    'Paris',
    'Cologne',
    'Brussels',
    'Amsterdam',
    'Hamburg',
    'Dusseldorf'
  ],
  selectedCity: 'Paris',
  sortType: SortType.Popular,
  selectedOffer: undefined,
  isOffersLoading: false,
  isSelectedOfferLoading: false,
};

export const reducer = createReducer<AppState>(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(selectSorting, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(setSelectedOfferLoadingStatus, (state, action) => {
      state.isSelectedOfferLoading = action.payload;
    });
});

