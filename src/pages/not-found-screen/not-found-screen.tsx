import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '@const';

export default function NotFoundScreen(): JSX.Element {
  return (
    <section className="six-cities">
      <Helmet>
        <title>6 cities: page not found</title>
      </Helmet>

      <section className="error__page" style={{textAlign: 'center', marginTop: '15%', fontSize: '28px'}}>
        <h1 className="error__name">Error 404: Page not found</h1>
        <Link to={AppRoute.Root}>Return to home page</Link>
      </section>
    </section>
  );
}
