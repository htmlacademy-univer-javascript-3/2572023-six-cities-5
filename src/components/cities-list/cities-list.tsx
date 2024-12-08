import { memo, useCallback, useState } from 'react';
import { useAppDispatch } from '@hooks/index';
import { City } from '@typings/city';
import { Cities } from '@const';
import { changeCity } from '@store/app-data/app-data';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeCity, setActiveCity] = useState<City | null>(Cities[0]);

  const handleCityChange = useCallback((city: City) => {
    setActiveCity(city);
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <ul className="locations__list tabs__list">
      {Cities.map((city) => (
        <li
          key={city.name}
          className="locations__item"
          onClick={() => handleCityChange(city)}
        >
          <a
            className={`locations__item-link tabs__item ${activeCity?.name === city.name ? 'tabs__item--active' : ''}`}
            href="#"
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const MemoizedCitiesList = memo(CitiesList);
export default MemoizedCitiesList;
