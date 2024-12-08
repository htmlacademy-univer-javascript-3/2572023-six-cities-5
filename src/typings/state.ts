import { store } from '@store/index';
import { Offers } from './offer';
import { Reviews } from './review';
import { AuthorizationStatus, SortType } from '@const';
import { OfferInDetails } from './offerInDetails';
import { City } from './city';


export type AppData = {
    city: City;
    sortType: SortType;
    error: string | null;
};

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    userEmail: string | null;
};

export type CurrentOfferData = {
    offerInfo: OfferInDetails | null;
    nearbyOffers: Offers;
    reviews: Reviews;
    isOfferInDetailsDataLoading: boolean;
};

export type OffersData = {
    offers: Offers;
    favoritesCount: number;
    isOffersDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
