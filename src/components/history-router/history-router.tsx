import { useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import {HistoryRouterProps} from '@components/history-router/history-router-props.ts';

export function HistoryRouter({
  basename,
  children,
  history,
}: HistoryRouterProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}
