import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppNavBar } from '../app-navbar/app-navbar';
import { AppRoute } from '../../const';

export type AppLayoutProps = {
  email?: string;
  favoriteCount?: number;
  onSignOutClick: () => void;
}

export function AppLayout({ email, favoriteCount, onSignOutClick }: AppLayoutProps) {
  const location = useLocation();
  const path = location.pathname;

  const isActive = path !== AppRoute.Main.toString();
  const isFavoritePage = path === AppRoute.Favorites.toString();
  const isNotLoginPage = path !== AppRoute.Login.toString();

  const pageClassLambda = (route: string) => {
    if (route === AppRoute.Main.toString()) {
      return 'page page--gray page--main';
    } else if (route === AppRoute.Login.toString()) {
      return 'page page--gray page--login';
    } else {
      return 'page';
    }
  };

  const pageClass = pageClassLambda(path);

  return (
    <div className={pageClass}>
      <AppNavBar
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
