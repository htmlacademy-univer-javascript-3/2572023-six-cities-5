import ReviewItem from "@components/review-item/review-item.tsx";
import {ReviewsListProps} from "@components/review-list/review-list-props.ts";

export default function ReviewList({ reviews }: ReviewsListProps): JSX.Element {
  if (!reviews) {
    return <p style={{textAlign: 'center', fontSize: '32px'}}>Leave first review</p>;
  }

  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
}
