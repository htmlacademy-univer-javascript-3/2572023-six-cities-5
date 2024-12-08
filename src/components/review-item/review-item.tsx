// import {ReviewItemProps} from '@components/review-item/review-item-props.ts';
//
// export default function ReviewItem({review}:ReviewItemProps): JSX.Element{
//   return (
//     <li key={review.id} className="reviews__item">
//       <div className="reviews__user user">
//         <div className="reviews__avatar-wrapper user__avatar-wrapper">
//           <img className="reviews__avatar user__avatar" src={review.user.imageSrc} width="54" height="54" alt="Reviews avatar"/>
//         </div>
//         <span className="reviews__user-name">{review.user.name}</span>
//         {review.user.isPro && <span className="offer__user-status">Pro</span>}
import { Review } from '@typings/review';
import { memo } from 'react';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const { user, rating, comment, date } = review;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="User avatar"/>
        </div>
        <span className="reviews__user-name">{user.name}</span>
        {user.isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{formattedDate}</time>
      </div>
    </li>
  );
}

const MemoizedReviewItem = memo(ReviewItem);
export default MemoizedReviewItem;
