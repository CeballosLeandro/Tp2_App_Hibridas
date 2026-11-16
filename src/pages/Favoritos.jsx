import { Link } from 'react-router';

import { Heart, Clapperboard } from 'lucide-react';

import { usePeliculas } from '../context/PeliculasContext';
import { useFavoritos } from '../context/FavoritosContext';

import TarjetaPelicula from '../components/peliculas/TarjetaPelicula';

function Favoritos() {

  const { peliculas, categorias } = usePeliculas();

  const { favoritos } = useFavoritos();

  // Obtener las películas que están en favoritos
  const peliculasFavoritas = peliculas.filter(
    (pelicula) => favoritos.includes(pelicula.id)
  );

  return (
    <div className="pagina-favoritos">

      <section className="favoritos-encabezado">

        <div className="favoritos-icono">
          <Heart size={30} />
        </div>

        <div>
          <h1>Mis Favoritos</h1>

          <p>
            Tu colección personal de películas y series.
          </p>
        </div>

      </section>

      <div className="favoritos-contador">
        {peliculasFavoritas.length}{' '}
        {peliculasFavoritas.length === 1
          ? 'contenido guardado'
          : 'contenidos guardados'}
      </div>

      {peliculasFavoritas.length > 0 ? (

        <section className="catalogo-grid">

          {peliculasFavoritas.map((pelicula) => (
            <TarjetaPelicula
              key={pelicula.id}
              pelicula={pelicula}
              categorias={categorias}
            />
          ))}

        </section>

      ) : (

        <section className="favoritos-vacios">

          <Clapperboard size={55} />

          <h2>Tu colección está vacía</h2>

          <p>
            Todavía no agregaste películas o series a favoritos.
            Explorá nuestro catálogo y guardá tus contenidos preferidos.
          </p>

          <Link to="/" className="boton-detalle">
            Explorar catálogo
          </Link>

        </section>

      )}

    </div>
  );
}

export default Favoritos;
