
import { createContext, useContext, useEffect, useState } from 'react';

import {
  obtenerPeliculas,
  obtenerCategorias,
  guardarPeliculas,
  guardarCategorias
} from '../services/almacenamiento';

const PeliculasContext = createContext();

export function PeliculasProvider({ children }) {

  //estados iniciales
  const [peliculas, setPeliculas] = useState(obtenerPeliculas);
  const [categorias, setCategorias] = useState(obtenerCategorias);

  //persistencia pelis
  useEffect(() => {
    guardarPeliculas(peliculas);
  }, [peliculas]);

  //persistencia categorias
  useEffect(() => {
    guardarCategorias(categorias);
  }, [categorias]);

  //nuevo id
  function generarId(elementos) {
    if (elementos.length === 0) return 1;

    return Math.max(...elementos.map((elemento) => elemento.id)) + 1;
  }

  //peliculas
  function agregarPelicula(nuevaPelicula) {
    const pelicula = {
      ...nuevaPelicula,
      id: generarId(peliculas)
    };

    setPeliculas((previas) => [...previas, pelicula]);

    return pelicula;
  }

  function editarPelicula(id, datosActualizados) {
    setPeliculas((previas) =>
      previas.map((pelicula) =>
        pelicula.id === id
          ? { ...pelicula, ...datosActualizados, id }
          : pelicula
      )
    );
  }

  function eliminarPelicula(id) {
    setPeliculas((previas) =>
      previas.filter((pelicula) => pelicula.id !== id)
    );
  }

  //categorias
  function agregarCategoria(nuevaCategoria) {
    const categoria = {
      ...nuevaCategoria,
      id: generarId(categorias)
    };

    setCategorias((previas) => [...previas, categoria]);

    return categoria;
  }

  function editarCategoria(id, datosActualizados) {
    setCategorias((previas) =>
      previas.map((categoria) =>
        categoria.id === id
          ? { ...categoria, ...datosActualizados, id }
          : categoria
      )
    );
  }

  function eliminarCategoria(id) {
    setCategorias((previas) =>
      previas.filter((categoria) => categoria.id !== id)
    );

    //quitar categoria
    setPeliculas((previas) =>
      previas.map((pelicula) => ({
        ...pelicula,
        categoriaIds: pelicula.categoriaIds.filter(
          (categoriaId) => categoriaId !== id
        )
      }))
    );
  }

  //valores contexto
  const valor = {
    peliculas,
    categorias,

    agregarPelicula,
    editarPelicula,
    eliminarPelicula,

    agregarCategoria,
    editarCategoria,
    eliminarCategoria
  };

  return (
    <PeliculasContext.Provider value={valor}>
      {children}
    </PeliculasContext.Provider>
  );
}

// Hook para utilizar contexto
export function usePeliculas() {
  const contexto = useContext(PeliculasContext);

  if (!contexto) {
    throw new Error(
      'usePeliculas debe utilizarse dentro de PeliculasProvider'
    );
  }

  return contexto;
}
