import { Routes, Route } from 'react-router';

import Layout from '../components/layout/Layout';
import Inicio from '../pages/Inicio';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />

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
