function TablaPeliculas({
  peliculas,
  categorias,
  alEditar,
  alEliminar
}) {
  function obtenerNombresCategorias(ids) {
    return (ids || [])
      .map((id) => categorias.find((categoria) => categoria.id === id)?.nombre)
      .filter(Boolean)
      .join(', ');
  }

  if (peliculas.length === 0) {
    return <p className="admin-vacio">Todavía no hay contenido registrado.</p>;
  }

  return (
    <div className="admin-tabla-contenedor">
      <table className="admin-tabla">
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Año</th>
            <th>Categorías</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {peliculas.map((pelicula) => (
            <tr key={pelicula.id}>
              <td>{pelicula.titulo}</td>

              <td>
                {pelicula.tipo === 'serie' ? 'Serie' : 'Película'}
              </td>

              <td>{pelicula.anio}</td>

              <td>
                {obtenerNombresCategorias(pelicula.categoriaIds) || 'Sin categoría'}
              </td>

              <td>
                <div className="admin-acciones-tabla">
                  <button
                    type="button"
                    onClick={() => alEditar(pelicula)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="admin-eliminar"
                    onClick={() => alEliminar(pelicula.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPeliculas;
