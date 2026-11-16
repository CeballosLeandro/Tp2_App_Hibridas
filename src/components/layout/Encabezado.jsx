import { NavLink, Link } from 'react-router';
import { Clapperboard, Film, Heart } from 'lucide-react';

function Encabezado() {
  const titulo = 'Vivi Show';

  return (
    <header className="encabezado">
      <div className="encabezado-contenido">

        <Link to="/" className="logo">
          <Clapperboard size={30} />
          <span>{titulo}</span>
        </Link>

        <nav className="navegacion">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link activo' : 'nav-link'
            }
          >
            <Film size={18} />
            Inicio
          </NavLink>

          <a href="#catalogo" className="nav-link">
            <Heart size={18} />
            Explorar
          </a>
        </nav>

      </div>
    </header>
  );
}

export default Encabezado;