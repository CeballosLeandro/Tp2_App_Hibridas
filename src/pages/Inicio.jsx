import { useMemo, useState } from 'react';

import { usePeliculas } from '../context/PeliculasContext';

import TarjetaPelicula from '../components/peliculas/TarjetaPelicula';
import Buscador from '../components/peliculas/Buscador';
import Filtros from '../components/peliculas/Filtros';
import Paginacion from '../components/peliculas/Paginacion';

function Inicio() {

  const { peliculas, categorias } = usePeliculas();

  // Estados de búsqueda y filtros
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('todos');
  const [categoriaId, setCategoriaId] = useState('todos');
  const [anio, setAnio] = useState('todos');

  // Estado de paginación
  const [paginaActual, setPaginaActual] = useState(1);

  const elementosPorPagina = 6;

  // Obtener años disponibles
  const anios = useMemo(() => {
    return [...new Set(peliculas.map((pelicula) => pelicula.anio))]
      .sort((a, b) => b - a);
  }, [peliculas]);

  // Filtrar películas y series
  const peliculasFiltradas = useMemo(() => {

    return peliculas.filter((pelicula) => {

      const coincideBusqueda =
        pelicula.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        pelicula.director.toLowerCase().includes(busqueda.toLowerCase());

      const coincideTipo =
        tipo === 'todos' || pelicula.tipo === tipo;

      const coincideCategoria =
        categoriaId === 'todos' ||
        pelicula.categoriaIds.includes(Number(categoriaId));

      const coincideAnio =
        anio === 'todos' || pelicula.anio === Number(anio);

      return (
        coincideBusqueda &&
        coincideTipo &&
        coincideCategoria &&
        coincideAnio
      );
    });

  }, [peliculas, busqueda, tipo, categoriaId, anio]);

  // Calcular cantidad de páginas
  const totalPaginas = Math.ceil(
    peliculasFiltradas.length / elementosPorPagina
  );

  // Obtener películas de la página actual
  const peliculasPaginadas = peliculasFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  // Reiniciar página al cambiar filtros
  function cambiarBusqueda(valor) {
    setBusqueda(valor);
    setPaginaActual(1);
  }

  function cambiarTipo(valor) {
    setTipo(valor);
    setPaginaActual(1);
  }

  function cambiarCategoria(valor) {
    setCategoriaId(valor);
    setPaginaActual(1);
  }

  function cambiarAnio(valor) {
    setAnio(valor);
    setPaginaActual(1);
  }

  function cambiarPagina(nuevaPagina) {
    setPaginaActual(nuevaPagina);
  }

  function alBuscar(evento) {
    evento.preventDefault();
    setPaginaActual(1);
  }

  return (
    <div className="pagina-inicio">

      <section className="hero">

        <span className="hero-etiqueta">
          Bienvenido a Vivi Show
        </span>

        <h1>
          Tu próximo mundo de
          <span> películas y series.</span>
        </h1>

        <p>
          Explorá nuestro catálogo, descubrí nuevas historias
          y encontrá tu próximo contenido favorito.
        </p>

      </section>

      <section className="catalogo" id="catalogo">

        <div className="catalogo-encabezado">
          <div>
            <h2>Explorar catálogo</h2>
            <p>
              Encontrá algo nuevo para ver.
            </p>
          </div>

          <span className="contador-resultados">
            {peliculasFiltradas.length} resultados
          </span>
        </div>

        <Buscador
          busqueda={busqueda}
          setBusqueda={cambiarBusqueda}
          alBuscar={alBuscar}
        />

        <Filtros
          tipo={tipo}
          setTipo={cambiarTipo}
          categoriaId={categoriaId}
          setCategoriaId={cambiarCategoria}
          anio={anio}
          setAnio={cambiarAnio}
          categorias={categorias}
          anios={anios}
        />

        {peliculasPaginadas.length > 0 ? (

          <div className="catalogo-grid">

            {peliculasPaginadas.map((pelicula) => (
              <TarjetaPelicula
                key={pelicula.id}
                pelicula={pelicula}
                categorias={categorias}
              />
            ))}

          </div>

        ) : (

          <div className="sin-resultados">
            <h3>No encontramos resultados</h3>
            <p>
              Probá con otra búsqueda o modificá los filtros.
            </p>
          </div>

        )}

        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
        />

      </section>

    </div>
  );
}

export default Inicio;
