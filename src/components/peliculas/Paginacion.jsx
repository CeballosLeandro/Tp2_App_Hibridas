import { ChevronLeft, ChevronRight } from 'lucide-react';

function Paginacion({
  paginaActual,
  totalPaginas,
  cambiarPagina
}) {
  if (totalPaginas <= 1) return null;

  return (
    <nav className="paginacion" aria-label="Paginación del catálogo">

      <button
        type="button"
        disabled={paginaActual === 1}
        onClick={() => cambiarPagina(paginaActual - 1)}
      >
        <ChevronLeft size={18} />
        Anterior
      </button>

      <span>
        Página {paginaActual} de {totalPaginas}
      </span>

      <button
        type="button"
        disabled={paginaActual === totalPaginas}
        onClick={() => cambiarPagina(paginaActual + 1)}
      >
        Siguiente
        <ChevronRight size={18} />
      </button>

    </nav>
  );
}

export default Paginacion;
