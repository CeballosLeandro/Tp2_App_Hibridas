import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

function RutaProtegida({ soloAdmin = false }) {
  const { autenticado, esAdmin } = useAuth();

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && !esAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RutaProtegida;
