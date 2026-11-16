import { Link } from 'react-router';
import { Clock, Calendar, Clapperboard } from 'lucide-react';

function TarjetaPelicula({ pelicula, categorias }) {
  const nombresCategorias = pelicula.categoriaIds
    .map((id) => categorias.find((categoria) => categoria.id === id)?.nombre)
    .filter(Boolean);

  return (
    <article className="tarjeta-pelicula">

      <Link
        to={`/pelicula/${pelicula.id}`}
        className="tarjeta-poster"
      >
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

        {pelicula.destacado && (
          <span className="etiqueta-destacado">
            Destacado
          </span>
        )}
      </Link>

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
