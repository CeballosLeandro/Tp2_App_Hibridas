import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import {
  campoObligatorio,
  validarEmail
} from '../utils/validaciones';

function Login() {
  const { iniciarSesion, autenticado } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (autenticado) {
    return <Navigate to="/" replace />;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setError('');

    if (!campoObligatorio(email) || !campoObligatorio(password)) {
      setError('Completá todos los campos.');
      return;
    }

    if (!validarEmail(email)) {
      setError('Ingresá un correo electrónico válido.');
      return;
    }

    const resultado = iniciarSesion(email, password);

    if (!resultado.exito) {
      setError(resultado.mensaje);
      return;
    }

    navigate('/');
  }

  return (
    <section className="pagina-auth">
      <div className="formulario-auth">
        <h1>¡Bienvenido de nuevo!</h1>
        <p>Iniciá sesión para continuar disfrutando de Vivi Show.</p>

        <form onSubmit={manejarEnvio}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            placeholder="tu@email.com"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            placeholder="Ingresá tu contraseña"
            required
          />

          {error && <p className="mensaje-error">{error}</p>}

          <button type="submit">Iniciar sesión</button>
        </form>

        <p>
          ¿Todavía no tenés cuenta?{' '}
          <Link to="/registro">Registrate</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
