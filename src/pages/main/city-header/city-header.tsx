import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const.ts';
import {CityHeaderProps} from '@pages/main/city-header/city-header-props.ts';

export function CityHeader({ city, cities, onCityClicked }: CityHeaderProps) {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities
              .map((item) => (
                <li
                  key={item}
                  className="locations__item"
                  onClick={() => onCityClicked(item)}
                >
                  <Link to={AppRoute.Main} className={`locations__item-link tabs__item ${item === city && 'tabs__item--active'}`}>
                    <span>{item}</span>
                  </Link>
                </li>)
              )
          }
        </ul>
      </section>
    </div>
  );
}
