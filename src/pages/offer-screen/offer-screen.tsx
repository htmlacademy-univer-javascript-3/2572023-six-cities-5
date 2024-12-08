import Logo from '@components/logo/logo';
import HeaderNav from '@components/header-nav/header-nav';
import { Helmet } from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import ReviewsList from '@components/review-list/review-list';
import Map from '@components/map/map';
import ReviewSendingForm from '@components/review-sending-form/review-sending-form';
import NearbyOffersList from '@components/nearby-offers-list/nearby-offers-list';
import { AuthorizationStatus, MapClassName } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { useCallback, useEffect, useMemo } from 'react';
import { fetchOfferInDetailsAction, toggleFavoriteStatusAction } from '@store/api-actions';
import LoadingScreen from '@pages/loading-screen/loading-screen';
import { getOffers } from '@store/offers-data/selectors';
import { getNearbyOffers, getOfferInDetails, getOfferInDetailsDataLoadingStatus, getReviews } from '@store/current-offer-data/selectors';
import { getAuthorizationStatus } from '@store/user-process/selectors';

export default function OfferScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const offers = useAppSelector(getOffers);
  const currentOffer = useMemo(() => offers.find((item) => item.id === id), [offers, id]);

  const offerInfo = useAppSelector(getOfferInDetails);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);

  const isOfferInDetailsDataLoading = useAppSelector(getOfferInDetailsDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const memoizedNearbyOffers = useMemo(() => nearbyOffers.map((nearbyOffer) =>
    offers.find((offer) => offer.id === nearbyOffer.id)).filter((offer) => offer !== undefined).slice(0, 3), [nearbyOffers, offers]);

  const handleFavoriteClick = useCallback(() => {
    if (currentOffer) {
      dispatch(toggleFavoriteStatusAction({ id: currentOffer.id, isFavorite: !currentOffer.isFavorite }));
    }
  }, [dispatch, currentOffer]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferInDetailsAction({ id }));
    }
  }, [id, dispatch]);

  if (isOfferInDetailsDataLoading) {
    return <LoadingScreen />;
  }

  if (!currentOffer || !offerInfo) {
    return <NotFoundScreen />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer {currentOffer.id}</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerInfo.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className={`offer__bookmark-button ${currentOffer.isFavorite && 'offer__bookmark-button--active'} button`} onClick={handleFavoriteClick} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `calc(100% / 5 * ${currentOffer.rating})`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offerInfo.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{offerInfo.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {offerInfo.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerInfo.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offerInfo.host.isPro && 'offer__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={offerInfo.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{offerInfo.host.name}</span>
                  {offerInfo.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offerInfo.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews ? reviews.length : 0}</span></h2>
                <ReviewsList reviews={reviews}/>
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewSendingForm />}
              </section>
            </div>
          </div>
          <Map
            city={currentOffer.city}
            offers={[currentOffer, ...memoizedNearbyOffers]}
            selectedOffer={currentOffer}
            className={MapClassName.Offer}
          />
        </section>
        <NearbyOffersList offers={memoizedNearbyOffers}/>
      </main>
    </div>
  );
}
