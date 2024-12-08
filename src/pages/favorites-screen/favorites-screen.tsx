import Logo from '@components/logo/logo';
import HeaderNav from '@components/header-nav/header-nav';
import { useAppSelector } from '@hooks/index';
import FooterLogo from '@components/footer-logo/footer-logo';
import FavoritesList from '@components/favorites-list/favorites-list';
import FavoritesEmpty from '@components/favorites-empty/favorites-empty';
import { memo, useMemo } from 'react';
import { getOffers } from '@store/offers-data/selectors';


function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);

  const favorites = useMemo(() => offers.filter((offer) => offer.isFavorite), [offers]);

  const cities = useMemo(() => Array.from(new Set(favorites.map((offer) => offer.city.name))).sort(), [favorites]);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <HeaderNav/>
          </div>
        </div>
      </header>

      {cities.length > 0 ? (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList cities={cities} favorites={favorites} />
            </section>
          </div>
        </main>
      ) : (
        <FavoritesEmpty />
      )}

      <FooterLogo />
    </div>
  );
}

const MemoizedFavoritesScreen = memo(FavoritesScreen);
export default MemoizedFavoritesScreen;
