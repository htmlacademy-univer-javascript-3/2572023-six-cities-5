import { ReviewItem } from '../review-item/review-item.tsx';
import {ReviewListProps} from '@pages/offer/reviews/review-list/review-list-props.ts';

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {
        reviews
          .slice(0, 10)
          .map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
            />)
          )
      }
    </ul>
  );
}

