import { useEffect, useState } from 'react';
import {
  campoObligatorio,
  validarAnio,
  numeroPositivo
} from '../../utils/validaciones';

function crearFormularioInicial(pelicula = null) {
  return {
    titulo: pelicula?.titulo || '',
    anio: pelicula?.anio || '',
    tipo: pelicula?.tipo || 'pelicula',
    duracion: pelicula?.duracion || '',
    director: pelicula?.director || '',
    sinopsis: pelicula?.sinopsis || '',
    poster: pelicula?.poster || '',
    destacado: pelicula?.destacado || false,
    categoriaIds: pelicula?.categoriaIds || []
  };
}

function FormularioPelicula({
  peliculaInicial,
  categorias,
  onGuardar,
  onCancelar
}) {
  const [formulario, setFormulario] = useState(
    () => crearFormularioInicial(peliculaInicial)
  );

  const [error, setError] = useState('');

  useEffect(() => {
    setFormulario(crearFormularioInicial(peliculaInicial));
    setError('');
  }, [peliculaInicial]);

  function manejarCambio(evento) {
    const { name, value, type, checked } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function manejarCategoria(id) {
    setFormulario((anterior) => {
      const seleccionadas = anterior.categoriaIds.includes(id)
        ? anterior.categoriaIds.filter((item) => item !== id)
        : [...anterior.categoriaIds, id];

      return {
        ...anterior,
        categoriaIds: seleccionadas
      };
    });
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setError('');

    if (
      !campoObligatorio(formulario.titulo) ||
      !campoObligatorio(formulario.anio) ||
      !campoObligatorio(formulario.director) ||
      !campoObligatorio(formulario.sinopsis)
    ) {
      setError('Completá todos los campos obligatorios.');
      return;
    }

    if (!validarAnio(formulario.anio)) {
      setError('Ingresá un año válido.');
      return;
    }

    if (!numeroPositivo(formulario.duracion)) {
      setError('Ingresá una duración o cantidad de temporadas válida.');
      return;
    }

    onGuardar({
      ...formulario,
      anio: Number(formulario.anio),
      duracion: Number(formulario.duracion),
      titulo: formulario.titulo.trim(),
      director: formulario.director.trim(),
      sinopsis: formulario.sinopsis.trim(),
      poster: formulario.poster.trim() || null
    });

    if (!peliculaInicial) {
      setFormulario(crearFormularioInicial());
    }
  }

  return (
    <form className="admin-formulario" onSubmit={manejarEnvio}>
      <h3>
        {peliculaInicial ? 'Editar contenido' : 'Agregar contenido'}
      </h3>

      <label htmlFor="titulo">Título *</label>
      <input
        id="titulo"
        name="titulo"
        value={formulario.titulo}
        onChange={manejarCambio}
        required
      />

      <div className="admin-formulario-grid">
        <div>
          <label htmlFor="tipo">Tipo *</label>
          <select
            id="tipo"
            name="tipo"
            value={formulario.tipo}
            onChange={manejarCambio}
          >
            <option value="pelicula">Película</option>
            <option value="serie">Serie</option>
          </select>
        </div>

        <div>
          <label htmlFor="anio">Año *</label>
          <input
            id="anio"
            name="anio"
            type="number"
            min="1888"
            max={new Date().getFullYear() + 5}
            value={formulario.anio}
            onChange={manejarCambio}
            required
          />
        </div>
      </div>

      <label htmlFor="duracion">
        {formulario.tipo === 'serie'
          ? 'Cantidad de temporadas *'
          : 'Duración en minutos *'}
      </label>
      <input
        id="duracion"
        name="duracion"
        type="number"
        min="1"
        value={formulario.duracion}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="director">Director o creador *</label>
      <input
        id="director"
        name="director"
        value={formulario.director}
        onChange={manejarCambio}
        required
      />

      <label htmlFor="poster">URL del póster</label>
      <input
        id="poster"
        name="poster"
        type="url"
        value={formulario.poster}
        onChange={manejarCambio}
        placeholder="https://..."
      />

      <label htmlFor="sinopsis">Sinopsis *</label>
      <textarea
        id="sinopsis"
        name="sinopsis"
        value={formulario.sinopsis}
        onChange={manejarCambio}
        rows="4"
        required
      />

      <fieldset className="admin-categorias">
        <legend>Categorías</legend>

        {categorias.length === 0 ? (
          <p>Primero tenés que crear una categoría.</p>
        ) : (
          <div className="admin-checkboxes">
            {categorias.map((categoria) => (
              <label key={categoria.id}>
                <input
                  type="checkbox"
                  checked={formulario.categoriaIds.includes(categoria.id)}
                  onChange={() => manejarCategoria(categoria.id)}
                />
                {categoria.nombre}
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <label className="admin-destacado">
        <input
          type="checkbox"
          name="destacado"
          checked={formulario.destacado}
          onChange={manejarCambio}
        />
        Marcar como contenido destacado
      </label>

      {error && <p className="mensaje-error">{error}</p>}

      <div className="admin-acciones">
        <button type="submit">
          {peliculaInicial ? 'Guardar cambios' : 'Agregar contenido'}
        </button>

        {peliculaInicial && (
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioPelicula;
