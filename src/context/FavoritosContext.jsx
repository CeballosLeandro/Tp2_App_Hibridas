
import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const { usuario, actualizarFavoritosUsuario } = useAuth();

  const favoritos = usuario?.favoritos || [];

  function esFavorito(id) {
    return favoritos.includes(Number(id));
  }

  function agregarFavorito(id) {
    const idNumerico = Number(id);

    if (!usuario || esFavorito(idNumerico)) return;

    actualizarFavoritosUsuario([...favoritos, idNumerico]);
  }

  function quitarFavorito(id) {
    const idNumerico = Number(id);

    if (!usuario) return;

    actualizarFavoritosUsuario(
      favoritos.filter((favoritoId) => favoritoId !== idNumerico)
    );
  }

  function alternarFavorito(id) {
    if (esFavorito(id)) {
      quitarFavorito(id);
    } else {
      agregarFavorito(id);
    }
  }

  const valor = {
    favoritos,
    esFavorito,
    agregarFavorito,
    quitarFavorito,
    alternarFavorito
  };

  return (
    <FavoritosContext.Provider value={valor}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const contexto = useContext(FavoritosContext);

  if (!contexto) {
    throw new Error(
      'useFavoritos debe utilizarse dentro de FavoritosProvider.'
    );
  }

  return contexto;
}
