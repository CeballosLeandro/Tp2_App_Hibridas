import { usePeliculas } from './context/PeliculasContext';

function App() {
  const {
    peliculas,
    categorias,
    agregarPelicula,
    eliminarPelicula
  } = usePeliculas();

  function agregarPrueba() {
    agregarPelicula({
      titulo: 'Película de prueba',
      anio: 2026,
      tipo: 'pelicula',
      duracion: 120,
      categoriaIds: [1],
      sinopsis: 'Película agregada para probar el CRUD.',
      director: 'Director de prueba',
      poster: null,
      destacado: false
    });
  }

  return (
    <main>
      <h1>Vivi Show</h1>

      <h2>Películas: {peliculas.length}</h2>

      <button onClick={agregarPrueba}>
        Agregar película de prueba
      </button>

      <h2>Categorías: {categorias.length}</h2>

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {categoria.nombre}
          </li>
        ))}
      </ul>

      <h2>Catálogo</h2>

      {peliculas.map((pelicula) => (
        <article key={pelicula.id}>
          <h3>{pelicula.titulo}</h3>
          <p>{pelicula.anio}</p>

          <button
            onClick={() => eliminarPelicula(pelicula.id)}
          >
            Eliminar
          </button>
        </article>
      ))}
    </main>
  );
}

export default App;