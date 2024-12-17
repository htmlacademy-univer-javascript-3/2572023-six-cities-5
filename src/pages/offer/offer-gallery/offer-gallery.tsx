import {OfferGalleryProps} from '@pages/offer/offer-gallery/offer-gallery-props.ts';

export function OfferGallery({ images }: OfferGalleryProps) {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {
          images.map((image) => (
            <div
              key={image}
              className="offer__image-wrapper"
            >
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>)
          )
        }
      </div>
    </div>
  );
}
