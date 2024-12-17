import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { SyntheticEvent } from 'react';

export type AppNavBarProps = {
  isActive: boolean;
  showOptions: boolean;
  email?: string;
  favoriteCount?: number;
  onSignOutClick: () => void;
}

export function AppNavBar({ isActive, showOptions, email, favoriteCount, onSignOutClick }: AppNavBarProps) {

  const handleSignOutClick = (event: SyntheticEvent) => {
    event.preventDefault();
    onSignOutClick();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              className={`header__logo-link ${isActive && 'header__logo-link--active'}`}
              to={AppRoute.Main}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {
            showOptions &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {
                  email === undefined &&
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Login} className='header__nav-link header__nav-link--profile'>
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                }
                {
                  email !== undefined && favoriteCount !== undefined &&
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{email}</span>
                      <span className="header__favorite-count">{favoriteCount}</span>
                    </Link>
                  </li>
                }
                {
                  email !== undefined &&
                  <li className="header__nav-item">
                    <Link
                      to={AppRoute.Main}
                      className="header__nav-link"
                      onClick={handleSignOutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                }
              </ul>
            </nav>
          }
        </div>
      </div>
    </header>
  );
}
