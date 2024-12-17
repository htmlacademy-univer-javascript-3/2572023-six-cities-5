import {ReviewAction} from '../../../../types/review-action.ts';

export type ReviewFormProps = {
  offerId: string;
  comment: string;
  rating: number;
  isDisabled: boolean;
  onCommentChanged: (value: string) => void;
  onRatingChanged: (value: number) => void;
  onFormSubmit: (action: ReviewAction) => void;
}
