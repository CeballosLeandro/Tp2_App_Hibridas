import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';

import { AuthProvider } from './context/AuthContext';
import { PeliculasProvider } from './context/PeliculasContext';
import { FavoritosProvider } from './context/FavoritosContext';

import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PeliculasProvider>
          <FavoritosProvider>
            <App />
          </FavoritosProvider>
        </PeliculasProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
