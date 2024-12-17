import { Link, Outlet, useLocation } from 'react-router-dom';
import { NavigationPage } from '@components/navigation-page/navigation-page.tsx';
import { AppRoute } from '../../const';
import {AppLayoutProps} from '@components/app-layout/app-layout-props.ts';

export function AppLayout({ email, favoriteCount, onSignOutClick }: AppLayoutProps) {
  const location = useLocation();
  const path = location.pathname;
  const isActive = path !== AppRoute.Main.toString();
  const isFavoritePage = path === AppRoute.Favorites.toString();
  const isNotLoginPage = path !== AppRoute.Login.toString();
  let pageClass;

  if (path === AppRoute.Main.toString()) {
    pageClass = 'page page--gray page--main';
  } else if (path === AppRoute.Login.toString()) {
    pageClass = 'page page--gray page--login';
  } else {
    pageClass = 'page';
  }

  return (
    <div className={pageClass}>
      <NavigationPage
        isActive={isActive}
        email={email}
        favoriteCount={favoriteCount}
        showOptions={isNotLoginPage}
        onSignOutClick={onSignOutClick}
      />
      <Outlet />
      {
        isFavoritePage &&
        <footer className="footer container">
          <Link to={AppRoute.Main} className='footer__logo-link'>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      }
    </div>
  );
}
