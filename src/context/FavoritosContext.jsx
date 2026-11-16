import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const FavoritosContext = createContext();

const CLAVE_FAVORITOS = 'vivi-favoritos';

// Recuperar favoritos del localStorage
function obtenerFavoritosIniciales() {
  try {
    const datosGuardados = localStorage.getItem(CLAVE_FAVORITOS);

    return datosGuardados ? JSON.parse(datosGuardados) : [];
  } catch (error) {
    console.error('Error al recuperar favoritos:', error);
    return [];
  }
}

export function FavoritosProvider({ children }) {

  const [favoritos, setFavoritos] = useState(obtenerFavoritosIniciales);

  // Guardar favoritos cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem(
        CLAVE_FAVORITOS,
        JSON.stringify(favoritos)
      );
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  }, [favoritos]);

  // Comprobar si una película es favorita
  function esFavorito(id) {
    return favoritos.includes(Number(id));
  }

  // Agregar una película
  function agregarFavorito(id) {
    const idNumerico = Number(id);

    setFavoritos((previos) => {
      if (previos.includes(idNumerico)) {
        return previos;
      }

      return [...previos, idNumerico];
    });
  }

  // Quitar una película
  function quitarFavorito(id) {
    const idNumerico = Number(id);

    setFavoritos((previos) =>
      previos.filter((favoritoId) => favoritoId !== idNumerico)
    );
  }

  // Alternar entre agregar y quitar
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

// Hook personalizado
export function useFavoritos() {
  const contexto = useContext(FavoritosContext);

  if (!contexto) {
    throw new Error(
      'useFavoritos debe utilizarse dentro de FavoritosProvider'
    );
  }

  return contexto;
}
