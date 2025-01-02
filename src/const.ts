export enum APIRoute {
  Offers = '/offers',
  OfferDetails = '/offers/:id',
  OfferReviews = '/comments/:id',
  OffersNearby = '/offers/:id/nearby',
  Favorite = '/favorite',
  ChangeFavoriteStatus = '/favorite/:id/:status',
  Login = '/login',
  Logout = '/logout'
}

export enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  Login = '/login',
  Offer = '/offer/:id',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const REVIEW_COMMENT_MAX_LENGTH = 300;
export const REVIEW_COMMENT_MIN_LENGTH = 50;
export const REVIEW_COUNT_MAX = 10;
export const REVIEW_COUNT_MIN = 0;
export const OFFERS_NEARBY_COUNT_MAX = 4;
export const OFFERS_NEARBY_COUNT_MIN = 0;
export const MIN_RATING = 1;
