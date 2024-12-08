import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../routing/app-routes';
import {memo} from 'react';

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

const MemoizedNotFoundPage = memo(NotFoundPage);
export default MemoizedNotFoundPage;
