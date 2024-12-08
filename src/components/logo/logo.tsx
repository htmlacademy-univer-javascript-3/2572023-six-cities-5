import { AppRoute } from '@const';
import { memo } from 'react';

function Logo(): JSX.Element {
  return (
    <div className="header__left">
      <a className="header__logo-link" href={AppRoute.Root}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </a>
    </div>
  );
}

const MemoizedLogo = memo(Logo);
export default MemoizedLogo;

