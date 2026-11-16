import { useState } from 'react';

import { usePeliculas } from '../context/PeliculasContext';

import FormularioPelicula from '../components/admin/FormularioPelicula';
import TablaPeliculas from '../components/admin/TablaPeliculas';
import FormularioCategoria from '../components/admin/FormularioCategoria';
import TablaCategorias from '../components/admin/TablaCategorias';

function Admin() {
  const {
    peliculas,
    categorias,
    agregarPelicula,
    editarPelicula,
    eliminarPelicula,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria
  } = usePeliculas();

  const [seccion, setSeccion] = useState('peliculas');

  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  function guardarPelicula(datos) {
    if (peliculaSeleccionada) {
      editarPelicula(peliculaSeleccionada.id, datos);
    } else {
      agregarPelicula(datos);
    }

    setPeliculaSeleccionada(null);
  }

  function manejarEliminarPelicula(id) {
    const confirmar = window.confirm(
      '¿Estás seguro de que querés eliminar este contenido?'
    );

    if (confirmar) {
      eliminarPelicula(id);

      if (peliculaSeleccionada?.id === id) {
        setPeliculaSeleccionada(null);
      }
    }
  }

  function guardarCategoria(nombre) {
    const nombreExiste = categorias.some(
      (categoria) =>
        categoria.nombre.toLowerCase() === nombre.toLowerCase() &&
        categoria.id !== categoriaSeleccionada?.id
    );

    if (nombreExiste) {
      window.alert('Ya existe una categoría con ese nombre.');
      return;
    }

    if (categoriaSeleccionada) {
      editarCategoria(categoriaSeleccionada.id, { nombre });
    } else {
      agregarCategoria({ nombre });
    }

    setCategoriaSeleccionada(null);
  }

  function manejarEliminarCategoria(id) {
    const confirmar = window.confirm(
      '¿Eliminar esta categoría? También se quitará de las películas y series asociadas.'
    );

    if (confirmar) {
      eliminarCategoria(id);

      if (categoriaSeleccionada?.id === id) {
        setCategoriaSeleccionada(null);
      }
    }
  }

  return (
    <section className="pagina-admin">

      <div className="admin-encabezado">
        <div>
          <span className="admin-etiqueta">ADMINISTRACIÓN</span>
          <h1>Panel de administración</h1>
          <p>Gestioná el catálogo de Vivi Show.</p>
        </div>
      </div>

      <div className="admin-resumen">
        <article className="admin-resumen-card">
          <span>Películas y series</span>
          <strong>{peliculas.length}</strong>
        </article>

        <article className="admin-resumen-card">
          <span>Categorías</span>
          <strong>{categorias.length}</strong>
        </article>

        <article className="admin-resumen-card">
          <span>Películas</span>
          <strong>
            {peliculas.filter((item) => item.tipo === 'pelicula').length}
          </strong>
        </article>

        <article className="admin-resumen-card">
          <span>Series</span>
          <strong>
            {peliculas.filter((item) => item.tipo === 'serie').length}
          </strong>
        </article>
      </div>

      <div className="admin-pestanas">
        <button
          type="button"
          className={seccion === 'peliculas' ? 'activa' : ''}
          onClick={() => setSeccion('peliculas')}
        >
          Películas y series
        </button>

        <button
          type="button"
          className={seccion === 'categorias' ? 'activa' : ''}
          onClick={() => setSeccion('categorias')}
        >
          Categorías
        </button>
      </div>

      {seccion === 'peliculas' ? (
        <div className="admin-seccion">
          <div className="admin-seccion-encabezado">
            <div>
              <h2>Gestión del catálogo</h2>
              <p>Agregá, modificá o eliminá películas y series.</p>
            </div>
          </div>

          <FormularioPelicula
            peliculaInicial={peliculaSeleccionada}
            categorias={categorias}
            onGuardar={guardarPelicula}
            onCancelar={() => setPeliculaSeleccionada(null)}
          />

          <h3>Contenido registrado</h3>

          <TablaPeliculas
            peliculas={peliculas}
            categorias={categorias}
            alEditar={setPeliculaSeleccionada}
            alEliminar={manejarEliminarPelicula}
          />
        </div>
      ) : (
        <div className="admin-seccion">
          <div className="admin-seccion-encabezado">
            <div>
              <h2>Gestión de categorías</h2>
              <p>Organizá el catálogo mediante categorías.</p>
            </div>
          </div>

          <FormularioCategoria
            categoriaInicial={categoriaSeleccionada}
            onGuardar={guardarCategoria}
            onCancelar={() => setCategoriaSeleccionada(null)}
          />

          <h3>Categorías registradas</h3>

          <TablaCategorias
            categorias={categorias}
            peliculas={peliculas}
            alEditar={setCategoriaSeleccionada}
            alEliminar={manejarEliminarCategoria}
          />
        </div>
      )}

    </section>
  );
}

export default Admin;
