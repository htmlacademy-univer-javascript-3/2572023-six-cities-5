import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const.ts';
import {appData} from './app-data/app-data';
import { userProcess } from './user-process/user-process.ts';
import {offersData} from './offers-data/offers-data';
import { currentOfferData } from './current-offer-data/current-offer-data.ts';

export const rootReducer = combineReducers({
  [NameSpace.App]: appData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.CurrentOffer]: currentOfferData.reducer,
  [NameSpace.Offers]: offersData.reducer,
});
