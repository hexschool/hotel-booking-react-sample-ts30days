import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/noto-serif-tc/500.css';
import '@fontsource/noto-serif-tc/600.css';
import '@fontsource/noto-serif-tc/700.css';
import './index.scss';

import App from './App.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
