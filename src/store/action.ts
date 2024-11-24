import { createAction } from '@reduxjs/toolkit';
import {Offers} from '../types/offer.ts';
import {Reviews} from '../types/reviews.ts';
import {OffersInDetails} from '../types/offer-details.ts';
export const setOffersList = createAction<Offers>('offers/setOffersList');
export const setReviews = createAction<Reviews>('reviews/setReviews');
export const setOffersInDetails = createAction<OffersInDetails>('offers/setOffersInDetails');
export const changeCity = createAction<string>('city/changeCity');
