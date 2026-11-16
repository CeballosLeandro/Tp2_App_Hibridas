import { Link, useParams } from 'react-router';

import {
  ArrowLeft,
  Calendar,
  Clock,
  Clapperboard,
  Heart,
  User
} from 'lucide-react';

import { usePeliculas } from '../context/PeliculasContext';
import { useFavoritos } from '../context/FavoritosContext';

function DetallePelicula() {

  const { id } = useParams();

  const { peliculas, categorias } = usePeliculas();

  const { esFavorito, alternarFavorito } = useFavoritos();

  // Buscar película por su identificador
  const pelicula = peliculas.find(
    (elemento) => elemento.id === Number(id)
  );

  // Si no existe, mostrar mensaje
  if (!pelicula) {
    return (
      <section className="detalle-no-encontrado">

        <Clapperboard size={55} />

        <h2>Contenido no encontrado</h2>

        <p>
          La película o serie que estás buscando no existe
          o ya no se encuentra disponible.
        </p>

        <Link to="/" className="boton-detalle">
          Volver al catálogo
        </Link>

      </section>
    );
  }

  const favorito = esFavorito(pelicula.id);

  // Obtener nombres de las categorías
  const categoriasPelicula = pelicula.categoriaIds
    .map((idCategoria) =>
      categorias.find(
        (categoria) => categoria.id === idCategoria
      )
    )
    .filter(Boolean);

  return (
    <div className="pagina-detalle">

      <Link to="/" className="volver-catalogo">
        <ArrowLeft size={18} />
        Volver al catálogo
      </Link>

      <section className="detalle-contenido">

        <div className="detalle-poster">

          {pelicula.poster ? (
            <img
              src={pelicula.poster}
              alt={`Póster de ${pelicula.titulo}`}
            />
          ) : (
            <div className="poster-placeholder">
              <Clapperboard size={65} />
              <span>{pelicula.titulo}</span>
            </div>
          )}

        </div>

        <div className="detalle-informacion">

          <span className="tipo-contenido">
            {pelicula.tipo === 'pelicula' ? 'Película' : 'Serie'}
          </span>

          <h1>{pelicula.titulo}</h1>

          <div className="detalle-metadata">

            <span>
              <Calendar size={17} />
              {pelicula.anio}
            </span>

            <span>
              <Clock size={17} />
              {pelicula.duracion} minutos
            </span>

          </div>

          <div className="detalle-categorias">

            {categoriasPelicula.map((categoria) => (
              <span key={categoria.id}>
                {categoria.nombre}
              </span>
            ))}

          </div>

          <div className="detalle-seccion">

            <h3>Sinopsis</h3>

            <p>{pelicula.sinopsis}</p>

          </div>

          <div className="detalle-director">

            <User size={20} />

            <div>
              <span>Director / Creador</span>
              <strong>{pelicula.director}</strong>
            </div>

          </div>

          <button
            type="button"
            className={`boton-favorito-detalle ${favorito ? 'seleccionado' : ''}`}
            onClick={() => alternarFavorito(pelicula.id)}
          >

            <Heart
              size={20}
              fill={favorito ? 'currentColor' : 'none'}
            />

            {favorito
              ? 'Quitar de favoritos'
              : 'Agregar a favoritos'}

          </button>

        </div>

      </section>

    </div>
  );
}

export default DetallePelicula;
