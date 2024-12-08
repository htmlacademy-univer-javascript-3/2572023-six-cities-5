import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../routing/app-routes';

export function NotFoundPage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
    >
      <h1><Link to={AppRoutes.main}>404 Tap to return home</Link></h1>
    </div>
  );
}
