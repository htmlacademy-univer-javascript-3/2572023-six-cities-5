import { Review } from '../../../types/review';
import { ReviewItem } from './review-item';

export type ReviewListProps = {
  reviews: Review[];
}

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

