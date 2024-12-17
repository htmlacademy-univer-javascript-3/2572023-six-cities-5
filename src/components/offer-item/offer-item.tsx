import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { FavoriteAction } from '../../types/favorite-action';

export type OfferItemProps = {
  offer: Offer;
  onFavoriteStatusChanged: (action: FavoriteAction) => void;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
}

export function OfferItem({ offer, onFavoriteStatusChanged, onMouseEnter, onMouseLeave }: OfferItemProps) {
  const bookmarkedClassName = offer.isFavorite && 'place-card__bookmark-button--active';

  const link = AppRoute.Offer.replace(':id', offer.id);

  const offerTypeString = offer.type.charAt(0).toUpperCase() + offer.type.slice(1);

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => onMouseEnter(offer.id)}
      onMouseLeave={() => onMouseLeave(offer.id)}
    >
      {
        offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={link} >
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${bookmarkedClassName} button`}
            onClick={() => onFavoriteStatusChanged({offerId: offer.id, status: !offer.isFavorite})}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.floor(offer.rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offerTypeString}</p>
      </div>
    </article>
  );
}
