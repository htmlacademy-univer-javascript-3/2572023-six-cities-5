import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Provider } from 'react-redux';
import { appStateStore } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={appStateStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
