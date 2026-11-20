// import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App';
import { StoreProvider } from './store/Store';
import './assets/styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <StoreProvider>
      <App />
    </StoreProvider>
  </Router>,
);
