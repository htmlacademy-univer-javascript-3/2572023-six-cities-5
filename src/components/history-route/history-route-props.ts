import type {BrowserHistory} from 'history';
import React from 'react';

export interface HistoryRouterProps {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
}
