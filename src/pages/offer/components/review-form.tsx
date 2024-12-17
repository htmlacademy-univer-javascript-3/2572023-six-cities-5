import { ChangeEvent, SyntheticEvent } from 'react';
import { ReviewAction } from '../../../types/review-action';
import { MIN_RATING, REVIEW_COMMENT_MAX_LENGTH, REVIEW_COMMENT_MIN_LENGTH } from '../../../const';

export type ReviewFormProps = {
  offerId: string;
  comment: string;
  rating: number;
  isDisabled: boolean;
  onCommentChanged: (value: string) => void;
  onRatingChanged: (value: number) => void;
  onFormSubmit: (action: ReviewAction) => void;
}

export function ReviewForm({ offerId, comment, rating, isDisabled, onCommentChanged, onRatingChanged, onFormSubmit }: ReviewFormProps) {
  const isNotFilled = comment.length < REVIEW_COMMENT_MIN_LENGTH || rating < MIN_RATING;

  const handleCommentChanged = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    onCommentChanged(value);
  };

  const handleRatingChanged = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    onRatingChanged(+value);
  };

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    onFormSubmit({
      offerId: offerId,
      comment: comment,
      rating: rating,
    });
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div
        className="reviews__rating-form form__rating"
        onChange={handleRatingChanged}
      >
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        maxLength={REVIEW_COMMENT_MAX_LENGTH}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleCommentChanged}
        disabled={isDisabled}
        value={comment}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isNotFilled || isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
