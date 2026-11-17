import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import {
  campoObligatorio,
  validarEmail,
  validarPassword,
  coincidenPasswords
} from '../utils/validaciones';

function Registro() {
  const { registrarUsuario, autenticado } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [error, setError] = useState('');

  if (autenticado) {
    return <Navigate to="/" replace />;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setError('');

    if (
      !campoObligatorio(nombre) ||
      !campoObligatorio(email) ||
      !campoObligatorio(password) ||
      !campoObligatorio(confirmacion)
    ) {
      setError('Completá todos los campos.');
      return;
    }

    if (!validarEmail(email)) {
      setError('Ingresá un correo electrónico válido.');
      return;
    }

    if (!validarPassword(password)) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (!coincidenPasswords(password, confirmacion)) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const resultado = registrarUsuario(nombre, email, password);

    if (!resultado.exito) {
      setError(resultado.mensaje);
      return;
    }

    navigate('/');
  }

  return (
    <section className="pagina-auth">
      <div className="formulario-auth">
        <h1>Crear una cuenta</h1>
        <p>Registrate para descubrir tu próximo contenido favorito.</p>

        <form onSubmit={manejarEnvio}>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            placeholder="Tu nombre"
            required
          />

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
            placeholder="Mínimo 6 caracteres"
            minLength={6}
            required
          />

          <label htmlFor="confirmacion">Confirmar contraseña</label>
          <input
            id="confirmacion"
            type="password"
            value={confirmacion}
            onChange={(evento) => setConfirmacion(evento.target.value)}
            placeholder="Repetí tu contraseña"
            required
          />

          {error && <p className="mensaje-error">{error}</p>}

          <button type="submit">Crear cuenta</button>
        </form>

        <p>
          ¿Ya tenés una cuenta?{' '}
          <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </section>
  );
}

export default Registro;
