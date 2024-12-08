import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../../domain/models/sort-type';
import { Offer } from '../../domain/models/offer';
import { OfferDetails } from '../../domain/models/offer-details';

export const selectCity = createAction<string>('chooseCity');

export const selectSorting = createAction<SortType>('chooseSorting');

export const setOffers = createAction<Offer[]>('loadOffers');
export const setOffersLoadingStatus = createAction<boolean>('setOffersLoadingStatus');

export const setSelectedOffer = createAction<OfferDetails | undefined>('setSelectedOffer');
export const setSelectedOfferLoadingStatus = createAction<boolean>('setSelectedOfferLoadingStatus');
