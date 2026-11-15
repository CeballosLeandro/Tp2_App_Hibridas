import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { PeliculasProvider } from './context/PeliculasContext.jsx';

import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PeliculasProvider>
      <App />
    </PeliculasProvider>
  </StrictMode>
);
