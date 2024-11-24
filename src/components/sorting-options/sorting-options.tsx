import React from 'react';

interface SortingOptionsProps {
  onSortChange: (sortType: string) => void;
  currentSortType: string;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({ onSortChange, currentSortType }) => {
  const sortingTypes = [
    { label: 'Popular', value: 'popular' },
    { label: 'Price: low to high', value: 'lowToHigh' },
    { label: 'Price: high to low', value: 'highToLow' },
    { label: 'Top rated first', value: 'topRated' },
  ];

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortingTypes.find((type) => type.value === currentSortType)?.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortingTypes.map(({ label, value }) => (
          <li
            key={value}
            className={`places__option ${currentSortType === value ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => onSortChange(value)}
          >
            {label}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortingOptions;
