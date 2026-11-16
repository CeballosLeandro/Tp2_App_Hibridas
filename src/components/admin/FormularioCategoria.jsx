import { useEffect, useState } from 'react';

function FormularioCategoria({
  categoriaInicial,
  onGuardar,
  onCancelar
}) {
  const [nombre, setNombre] = useState(
    categoriaInicial?.nombre || ''
  );

  const [error, setError] = useState('');

  useEffect(() => {
    setNombre(categoriaInicial?.nombre || '');
    setError('');
  }, [categoriaInicial]);

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
      setError('El nombre de la categoría es obligatorio.');
      return;
    }

    onGuardar(nombreLimpio);

    if (!categoriaInicial) {
      setNombre('');
    }
  }

  return (
    <form className="admin-formulario" onSubmit={manejarEnvio}>
      <h3>
        {categoriaInicial ? 'Editar categoría' : 'Nueva categoría'}
      </h3>

      <label htmlFor="nombre-categoria">Nombre *</label>

      <input
        id="nombre-categoria"
        value={nombre}
        onChange={(evento) => setNombre(evento.target.value)}
        placeholder="Ej. Ciencia ficción"
        required
      />

      {error && <p className="mensaje-error">{error}</p>}

      <div className="admin-acciones">
        <button type="submit">
          {categoriaInicial ? 'Guardar cambios' : 'Agregar categoría'}
        </button>

        {categoriaInicial && (
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioCategoria;
