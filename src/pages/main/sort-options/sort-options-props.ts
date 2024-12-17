import {SortType} from '../../../types/sort-type.ts';

export type SortOptionsProps = {
  sortType: SortType;
  handleSortingChoose: (sortType: SortType) => void;
}
