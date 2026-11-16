import { Filter } from 'lucide-react';

function Filtros({
  tipo,
  setTipo,
  categoriaId,
  setCategoriaId,
  anio,
  setAnio,
  categorias,
  anios
}) {
  return (
    <section className="filtros">

      <div className="filtros-titulo">
        <Filter size={20} />
        <h3>Filtrar catálogo</h3>
      </div>

      <div className="filtros-controles">

        <select
          value={tipo}
          onChange={(evento) => setTipo(evento.target.value)}
          aria-label="Filtrar por tipo"
        >
          <option value="todos">Todos los contenidos</option>
          <option value="pelicula">Películas</option>
          <option value="serie">Series</option>
        </select>

        <select
          value={categoriaId}
          onChange={(evento) => setCategoriaId(evento.target.value)}
          aria-label="Filtrar por categoría"
        >
          <option value="todos">Todas las categorías</option>

          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        <select
          value={anio}
          onChange={(evento) => setAnio(evento.target.value)}
          aria-label="Filtrar por año"
        >
          <option value="todos">Todos los años</option>

          {anios.map((anioDisponible) => (
            <option key={anioDisponible} value={anioDisponible}>
              {anioDisponible}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="boton-limpiar"
          onClick={() => {
            setTipo('todos');
            setCategoriaId('todos');
            setAnio('todos');
          }}
        >
          Limpiar filtros
        </button>

      </div>
    </section>
  );
}

export default Filtros;
