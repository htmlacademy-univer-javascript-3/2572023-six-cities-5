import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { OfferDetails } from '../types/offer-details';
import { SortType } from '../types/sort-type';
import { Offer } from '../types/offer';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';

export const selectCity = createAction<string>('selectCity');

export const selectSorting = createAction<SortType>('selectSorting');

export const setOffers = createAction<Offer[]>('setOffers');
export const setFavoriteOffers = createAction<Offer[] | undefined>('setFavoriteOffers');
export const clearFavorites = createAction('clearFavorites');
export const setOffersLoadingStatus = createAction<boolean>('setOffersLoadingStatus');
export const setOffer = createAction<Offer>('setOfferFavoriteStatus');

export const setSelectedOffer = createAction<OfferDetails | undefined>('setSelectedOffer');
export const setSelectedOfferLoadingStatus = createAction<boolean>('setSelectedOfferLoadingStatus');
export const setReviewFormIsSending = createAction<boolean>('setReviewFormSendingStatus');
export const addReview = createAction<Review>('addReview');

export const updateComment = createAction<string>('updateComment');
export const updateRating = createAction<number>('updateRating');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('setAuthorizationStatus');
export const setUserData = createAction<UserData | undefined>('setUserData');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
