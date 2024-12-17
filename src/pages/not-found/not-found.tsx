import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>404</h1>
      <h1><Link to={AppRoute.Main}>Return to home</Link></h1>
    </div>
  );
}
