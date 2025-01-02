import { ReviewItem } from '../review-item/review-item.tsx';
import {ReviewListProps} from '@pages/offer/reviews/review-list/review-list-props.ts';
import {REVIEW_COUNT_MIN, REVIEW_COUNT_MAX} from '../../../../const.ts';

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {
        reviews
          .slice(REVIEW_COUNT_MIN, REVIEW_COUNT_MAX)
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

