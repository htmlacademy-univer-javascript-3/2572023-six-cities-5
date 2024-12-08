import { NameSpace } from '../../const';
import { State } from '@typings/state';
import { OfferInDetails } from '@typings/offerInDetails';
import { Reviews } from '@typings/review';
import { Offers} from '@typings/offer';

export const getOfferInDetails = (state: State): OfferInDetails | null => state[NameSpace.CurrentOffer].offerInfo;
export const getNearbyOffers = (state: State): Offers => state[NameSpace.CurrentOffer].nearbyOffers;
export const getReviews = (state: State): Reviews => state[NameSpace.CurrentOffer].reviews;
export const getOfferInDetailsDataLoadingStatus = (state: State): boolean => state[NameSpace.CurrentOffer].isOfferInDetailsDataLoading;
