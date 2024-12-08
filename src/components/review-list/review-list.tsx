import ReviewItem from '@components/review-item/review-item';
import { Reviews } from '@typings/review';
import { memo, useMemo } from 'react';

type ReviewsListProps = {
  reviews: Reviews | undefined;
};

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  const sortedReviews = useMemo(() => {
    if (!reviews) {
      return [];
    }
    return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
  }, [reviews]);

  return (
    <div>
      {sortedReviews && sortedReviews.length > 0 ? (
        <ul className="reviews__list">
          {sortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', fontSize: '32px' }}>No reviews available</p>
      )}
    </div>
  );
}

const MemoizedReviewsList = memo(ReviewsList);
export default MemoizedReviewsList;
