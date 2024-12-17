import { NotFoundPage } from '../not-found/not-found';
import { Map } from '../main/components/map';
import { OfferList } from '../../components/offer-list/offer-list';
import { ReviewList } from './components/review-list';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { AppState } from '../../store/reducer';
import { addReviewAction, fetchOfferDetailsAction } from '../../store/api-actions';
import { LoadingScreen } from '../main/components/loading-screen';
import { Review } from '../../types/review';
import { Offer } from '../../types/offer';
import { OfferGallery } from './components/offer-gallery';
import { GoodsList } from './components/goods-list';
import { FavoriteAction } from '../../types/favorite-action';
import { ReviewForm } from './components/review-form';
import { AppRoute } from '../../const';
import { redirectToRoute, updateComment, updateRating } from '../../store/action';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ReviewAction } from '../../types/review-action';
import {memo} from 'react';

export type OfferPageProps = {
  canWriteComments: boolean;
  canAddToFavorite: boolean;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
}

function OfferPage({ canWriteComments, canAddToFavorite, onFavoriteStatusChanged }: OfferPageProps) {
  const { id } = useParams();

  const reviews = useSelector<AppState, Review[]>((state) => state.selectedOffer?.reviews ?? []);
  const offersNearby = useSelector<AppState, Offer[]>((state) => state.selectedOffer?.offersNearby ?? []);
  const offer = useSelector<AppState, Offer | undefined>((state) => state?.selectedOffer?.offer);
  const isOfferLoading = useSelector<AppState, boolean>((state) => state?.isSelectedOfferLoading);
  const reviewIsSending = useSelector<AppState, boolean>((state) => state.selectedOffer?.isReviewFormSending ?? false);
  const comment = useSelector<AppState, string>((state) => state.comment);
  const rating = useSelector<AppState, number>((state) => state.rating);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchOfferDetailsAction(id));
    }
  }, [dispatch, id]);

  if (isOfferLoading) {
    return <LoadingScreen />;
  }

  if (offer === undefined) {
    return <NotFoundPage />;
  }

  const offerTypeString = offer.type.charAt(0).toUpperCase() + offer.type.slice(1);

  const handleCommentFormSubmit = (action: ReviewAction) => {
    dispatch(addReviewAction(action));
  };

  const handleCommentChanged = (value: string) => {
    dispatch(updateComment(value));
  };

  const handleRatingChanged = (value: number) => {
    dispatch(updateRating(value));
  };

  const handleAddToFavoriteClick = (action: FavoriteAction) => {
    if (canAddToFavorite) {
      onFavoriteStatusChanged(action);
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <OfferGallery images={offer.images} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            {offer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
              </h1>
              <button
                type='button'
                className={`offer__bookmark-button ${offer.isFavorite && 'offer__bookmark-button--active'} button`}
                onClick={() => handleAddToFavoriteClick({ offerId: offer.id, status: !offer.isFavorite })}
              >
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${Math.floor(offer.rating) * 20}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offerTypeString}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <GoodsList goods={offer.goods} />
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
              <ReviewList reviews={reviews} />
              {canWriteComments &&
                <ReviewForm
                  offerId={offer.id}
                  onFormSubmit={handleCommentFormSubmit}
                  isDisabled={reviewIsSending}
                  comment={comment}
                  rating={rating}
                  onCommentChanged={handleCommentChanged}
                  onRatingChanged={handleRatingChanged}
                />}
            </section>
          </div>
        </div>
        <section className="offer__map map">

          <Map
            city={offersNearby[0].city}
            offers={offersNearby}
            activeOfferId={offer.id}
            className={'offer__map map'}
          />

        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList
            offers={offersNearby}
            className={'near-places__list places__list'}
            onFavoriteStatusChanged={handleAddToFavoriteClick}
          />
        </section>
      </div>
    </main>
  );
}

const MemoizedOfferPage = memo(OfferPage);
export default MemoizedOfferPage;
