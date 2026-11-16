import { Outlet } from 'react-router';
import Encabezado from './Encabezado';

function Layout() {
  return (
    <>
      <Encabezado />

      <main className="contenido-principal">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Vivi Show - Tu próximo mundo de películas y series.</p>
      </footer>
    </>
  );
}

export default Layout;
