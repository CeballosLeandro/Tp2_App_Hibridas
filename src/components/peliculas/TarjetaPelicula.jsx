import { Link } from 'react-router';
import {
  Clock,
  Calendar,
  Clapperboard,
  Heart
} from 'lucide-react';

import { useFavoritos } from '../../context/FavoritosContext';

function TarjetaPelicula({ pelicula, categorias }) {

  const { esFavorito, alternarFavorito } = useFavoritos();

  const favorito = esFavorito(pelicula.id);

  const nombresCategorias = pelicula.categoriaIds
    .map((id) => categorias.find(
      (categoria) => categoria.id === id
    )?.nombre)
    .filter(Boolean);

  return (
    <article className="tarjeta-pelicula">

      <div className="tarjeta-poster">

        <Link to={`/pelicula/${pelicula.id}`}>
          {pelicula.poster ? (
            <img
              src={pelicula.poster}
              alt={`Póster de ${pelicula.titulo}`}
            />
          ) : (
            <div className="poster-placeholder">
              <Clapperboard size={48} />
              <span>{pelicula.titulo}</span>
            </div>
          )}
        </Link>

        {pelicula.destacado && (
          <span className="etiqueta-destacado">
            Destacado
          </span>
        )}

        <button
          type="button"
          className={`boton-favorito ${favorito ? 'seleccionado' : ''}`}
          onClick={() => alternarFavorito(pelicula.id)}
          aria-label={
            favorito
              ? `Quitar ${pelicula.titulo} de favoritos`
              : `Agregar ${pelicula.titulo} a favoritos`
          }
          aria-pressed={favorito}
        >
          <Heart
            size={20}
            fill={favorito ? 'currentColor' : 'none'}
          />
        </button>

      </div>

      <div className="tarjeta-contenido">

        <span className="tipo-contenido">
          {pelicula.tipo === 'pelicula' ? 'Película' : 'Serie'}
        </span>

        <h3>{pelicula.titulo}</h3>

        <div className="tarjeta-metadata">
          <span>
            <Calendar size={14} />
            {pelicula.anio}
          </span>

          <span>
            <Clock size={14} />
            {pelicula.duracion} min
          </span>
        </div>

        <div className="tarjeta-categorias">
          {nombresCategorias.map((nombre) => (
            <span key={nombre}>{nombre}</span>
          ))}
        </div>

        <p className="tarjeta-sinopsis">
          {pelicula.sinopsis}
        </p>

        <Link
          to={`/pelicula/${pelicula.id}`}
          className="boton-detalle"
        >
          Ver detalles
        </Link>

      </div>
    </article>
  );
}

export default TarjetaPelicula;
