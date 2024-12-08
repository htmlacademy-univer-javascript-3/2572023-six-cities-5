import { AppRoute } from '@const';
import { memo } from 'react';

function FooterLogo(): JSX.Element {
  return (
    <footer className="footer container">
      <a className="footer__logo-link" href={AppRoute.Root}>
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </a>
    </footer>
  );
}

const MemoizedFooterLogo = memo(FooterLogo);
export default MemoizedFooterLogo;
