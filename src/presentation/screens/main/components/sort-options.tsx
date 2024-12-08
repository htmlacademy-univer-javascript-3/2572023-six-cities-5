import { useState } from 'react';
import { SortType } from '../../../../domain/models/sort-type';

export type SortOptionsProps = {
  sortType: SortType;
  handleSortingChoose: (sortType: SortType) => void;
}

export function SortOptions({ sortType, handleSortingChoose }: SortOptionsProps) {
  const [isOpened, setIsOpened] = useState<boolean>();

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => setIsOpened(!isOpened)}
        className="places__sorting-type"
        tabIndex={0}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}>
        {
          Object.values(SortType)
            .map((item) => (
              <li
                onClick={() => {
                  setIsOpened(false);
                  handleSortingChoose(item);
                }}
                key={item}
                className={`places__option ${item === sortType && 'places__option--active'}`}
                tabIndex={0}
              >{item}
              </li>)
            )
        }
      </ul>
    </form>
  );
}
