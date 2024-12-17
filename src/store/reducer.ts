import { createReducer } from '@reduxjs/toolkit';
import { addReview, clearFavorites, selectCity, selectSorting, setAuthorizationStatus, setReviewFormIsSending, setFavoriteOffers, setOffer, setOffers, setOffersLoadingStatus, setSelectedOffer, setSelectedOfferLoadingStatus, setUserData, updateComment, updateRating } from './action';
import { Offer } from '../types/offer';
import { SortType } from '../types/sort-type';
import { OfferDetails } from '../types/offer-details';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';

export type AppState = {
  offers: Offer[];
  favoriteOffers?: Offer[];
  cities: string[];
  selectedCity: string;
  sortType: SortType;
  selectedOffer?: OfferDetails;
  isOffersLoading: boolean;
  isSelectedOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData?: UserData;
  comment: string;
  rating: number;
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
  authorizationStatus: AuthorizationStatus.Unknown,
  comment: '',
  rating: 0,
  userData: undefined,
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
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(updateComment, (state, { payload }) => {
      state.comment = payload;
    })
    .addCase(updateRating, (state, { payload }) => {
      state.rating = payload;
    })
    .addCase(clearFavorites, (state) => {
      state.favoriteOffers = undefined;

      if (state.selectedOffer?.offer !== undefined) {
        state.selectedOffer.offer.isFavorite = false;
      }
    })
    .addCase(setOffer, (state, { payload }) => {
      state.offers = state.offers.map((offer) =>
        offer.id === payload.id ? payload : offer,
      );

      if (state.selectedOffer?.offer.id === payload.id) {
        state.selectedOffer.offer = payload;
      }

      if (state.selectedOffer?.offersNearby !== undefined) {
        state.selectedOffer.offersNearby = state.selectedOffer?.offersNearby.map((offer) =>
          offer.id === payload.id ? payload : offer,
        );
      }

      state.favoriteOffers = state.favoriteOffers?.filter((offer) => offer.id !== payload.id);

      if (payload.isFavorite) {
        state.favoriteOffers?.push(payload);
      }
    })
    .addCase(setSelectedOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(addReview, (state, { payload }) => {
      if (state.selectedOffer !== undefined) {
        state.selectedOffer.reviews.unshift(payload);
      }
    })
    .addCase(setSelectedOfferLoadingStatus, (state, action) => {
      state.isSelectedOfferLoading = action.payload;
    })
    .addCase(setReviewFormIsSending, (state, action) => {
      if (state.selectedOffer !== undefined) {
        state.selectedOffer.isReviewFormSending = action.payload;
      }
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

