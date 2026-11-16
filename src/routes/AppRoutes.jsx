import { Routes, Route } from 'react-router';

import Layout from '../components/layout/Layout';

import Inicio from '../pages/Inicio';
import DetallePelicula from '../pages/DetallePelicula';
import Favoritos from '../pages/Favoritos';

function AppRoutes() {

  return (
    <Routes>

      <Route element={<Layout />}>

        <Route path="/" element={<Inicio />} />

        <Route
          path="/pelicula/:id"
          element={<DetallePelicula />}
        />

        <Route
          path="/favoritos"
          element={<Favoritos />}
        />

        <Route
          path="*"
          element={
            <div className="sin-resultados">
              <h2>Página no encontrada</h2>
              <p>La página que buscás no existe.</p>
            </div>
          }
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;
