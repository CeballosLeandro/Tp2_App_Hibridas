import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App';

import { PeliculasProvider } from './context/PeliculasContext';
import { FavoritosProvider } from './context/FavoritosContext';

import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PeliculasProvider>
        <FavoritosProvider>
          <App />
        </FavoritosProvider>
      </PeliculasProvider>
    </BrowserRouter>
  </StrictMode>
);
