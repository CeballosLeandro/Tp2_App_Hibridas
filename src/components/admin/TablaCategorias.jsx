function TablaCategorias({
  categorias,
  peliculas,
  alEditar,
  alEliminar
}) {
  if (categorias.length === 0) {
    return <p className="admin-vacio">Todavía no hay categorías registradas.</p>;
  }

  return (
    <div className="admin-tabla-contenedor">
      <table className="admin-tabla">
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Contenido asociado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((categoria) => {
            const cantidad = peliculas.filter((pelicula) =>
              (pelicula.categoriaIds || []).includes(categoria.id)
            ).length;

            return (
              <tr key={categoria.id}>
                <td>{categoria.nombre}</td>
                <td>{cantidad}</td>

                <td>
                  <div className="admin-acciones-tabla">
                    <button
                      type="button"
                      onClick={() => alEditar(categoria)}
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      className="admin-eliminar"
                      onClick={() => alEliminar(categoria.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaCategorias;
