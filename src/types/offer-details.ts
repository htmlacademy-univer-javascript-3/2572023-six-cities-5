import { Offer } from './offer';
import { Review } from './review';

export type OfferDetails = {
  offer: Offer;
  reviews: Review[];
  offersNearby: Offer[];
  isReviewFormSending: boolean;
}
