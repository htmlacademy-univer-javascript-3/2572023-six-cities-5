import ReactDOM from 'react-dom/client';
import { App } from './presentation/app';
import React from 'react';
import 'leaflet/dist/leaflet.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
