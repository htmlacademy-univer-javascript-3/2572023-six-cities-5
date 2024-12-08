import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@const';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { logoutAction } from '@store/api-actions';
import { memo, useCallback } from 'react';
import { getOffers } from '@store/offers-data/selectors';
import { getAuthorizationStatus, getUserEmail } from '@store/user-process/selectors';


function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserEmail);
  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;

  const handleSignOut = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{userEmail}</span>
                <span className="header__favorite-count">{favoritesCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to={AppRoute.Root} onClick={handleSignOut}>
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>)
          : (
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          )}
      </ul>
    </nav>
  );
}

const MemoizedHeaderNav = memo(HeaderNav);
export default MemoizedHeaderNav;
