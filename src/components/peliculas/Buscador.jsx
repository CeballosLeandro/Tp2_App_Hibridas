import { Search } from 'lucide-react';

function Buscador({ busqueda, setBusqueda, alBuscar }) {
  return (
    <form className="buscador" onSubmit={alBuscar}>

      <div className="buscador-input">
        <Search size={20} />

        <input
          type="search"
          placeholder="Buscar películas o series..."
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          aria-label="Buscar películas o series"
        />
      </div>

      <button type="submit">
        Buscar
      </button>

    </form>
  );
}

export default Buscador;
