
import { Routes, Route } from 'react-router';

import Layout from '../components/layout/Layout';
import Inicio from '../pages/Inicio';
import DetallePelicula from '../pages/DetallePelicula';
import Favoritos from '../pages/Favoritos';
import Login from '../pages/Login';
import Registro from '../pages/Registro';

import RutaProtegida from './RutaProtegida';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Páginas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/pelicula/:id" element={<DetallePelicula />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Páginas para usuarios autenticados */}
        <Route element={<RutaProtegida />}>
          <Route path="/favoritos" element={<Favoritos />} />
        </Route>

        {/* Futuras páginas exclusivas del administrador */}
        <Route element={<RutaProtegida soloAdmin />}>
          {/* Acá incorporaremos el panel administrativo */}
        </Route>

        <Route
          path="*"
          element={
            <div className="pagina-no-encontrada">
              <h1>404</h1>
              <p>La página que buscás no existe.</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
