import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export function NotFoundPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
    >
      <h1><Link to={AppRoute.Main}>404 Tap to return home</Link></h1>
    </div>
  );
}
