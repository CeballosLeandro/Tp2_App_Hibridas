
import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

import {
  Clapperboard,
  Film,
  Heart,
  LogIn,
  UserPlus,
  LogOut
} from 'lucide-react';

function Encabezado() {
  const titulo = 'Vivi Show';

  const { usuario, autenticado, cerrarSesion, esAdmin } = useAuth();
  const navigate = useNavigate();

  function manejarCierreSesion() {
    cerrarSesion();
    navigate('/');
  }

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

          {autenticado ? (
            <>
              <span className="usuario-sesion">
                Hola, {usuario.nombre}
                {esAdmin && ' (Admin)'}
              </span>

              <NavLink
                to="/favoritos"
                className={({ isActive }) =>
                  isActive ? 'nav-link activo' : 'nav-link'
                }
              >
                <Heart size={18} />
                Mis Favoritos
              </NavLink>

              <button
                className="nav-link boton-sesion"
                onClick={manejarCierreSesion}
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'nav-link activo' : 'nav-link'
                }
              >
                <LogIn size={18} />
                Iniciar sesión
              </NavLink>

              <NavLink
                to="/registro"
                className={({ isActive }) =>
                  isActive ? 'nav-link activo' : 'nav-link'
                }
              >
                <UserPlus size={18} />
                Registrarse
              </NavLink>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Encabezado;
