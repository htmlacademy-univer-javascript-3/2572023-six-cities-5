import {OfferInsideListProps} from '@pages/offer/offer-inside-list/offer-inside-list-props.ts';

export function OfferInsideList({ insides }: OfferInsideListProps) {
  return (
    <ul className="offer__inside-list">
      {
        insides && insides.map((inside) => (
          <li className="offer__inside-item" key={inside}>{inside}</li>)
        )
      }
    </ul>
  );
}
