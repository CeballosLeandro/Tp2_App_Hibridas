import { createContext, useContext, useEffect, useState } from 'react';
import { obtenerUsuarios, guardarUsuarios } from '../services/almacenamiento';

const AuthContext = createContext();

const CLAVE_SESION = 'vivi-sesion';

export function AuthProvider({ children }) {
  const [usuarios, setUsuarios] = useState(obtenerUsuarios);

  const [usuarioId, setUsuarioId] = useState(() => {
    const sesionGuardada = localStorage.getItem(CLAVE_SESION);
    return sesionGuardada ? Number(sesionGuardada) : null;
  });

  const usuario = usuarios.find(
    (item) => item.id === usuarioId
  ) || null;

  // Guardar los usuarios cuando se modifiquen.
  useEffect(() => {
    guardarUsuarios(usuarios);
  }, [usuarios]);

  // Iniciar sesión.
  function iniciarSesion(email, password) {
    const emailNormalizado = email.trim().toLowerCase();

    const usuarioEncontrado = usuarios.find(
      (item) =>
        item.email.toLowerCase() === emailNormalizado &&
        item.password === password
    );

    if (!usuarioEncontrado) {
      return {
        exito: false,
        mensaje: 'El email o la contraseña son incorrectos.'
      };
    }

    localStorage.setItem(CLAVE_SESION, usuarioEncontrado.id);
    setUsuarioId(usuarioEncontrado.id);

    return { exito: true };
  }

  // Registrar un usuario nuevo.
  function registrarUsuario(nombre, email, password) {
    const nombreNormalizado = nombre.trim();
    const emailNormalizado = email.trim().toLowerCase();

    if (!nombreNormalizado || !emailNormalizado || !password) {
      return {
        exito: false,
        mensaje: 'Todos los campos son obligatorios.'
      };
    }

    const emailExiste = usuarios.some(
      (item) => item.email.toLowerCase() === emailNormalizado
    );

    if (emailExiste) {
      return {
        exito: false,
        mensaje: 'Ya existe una cuenta con ese email.'
      };
    }

    const nuevoUsuario = {
      id: Math.max(0, ...usuarios.map((item) => item.id)) + 1,
      nombre: nombreNormalizado,
      email: emailNormalizado,
      password,
      rol: 'usuario',
      favoritos: []
    };

    setUsuarios((anteriores) => [...anteriores, nuevoUsuario]);

    localStorage.setItem(CLAVE_SESION, nuevoUsuario.id);
    setUsuarioId(nuevoUsuario.id);

    return { exito: true };
  }

  // Cerrar sesión.
  function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
    setUsuarioId(null);
  }

  function actualizarFavoritosUsuario(nuevosFavoritos) {
    if (!usuario) return;

    setUsuarios((anteriores) =>
        anteriores.map((item) =>
        item.id === usuario.id
            ? { ...item, favoritos: nuevosFavoritos }
            : item
        )
    );
  }

    const valor = {
    usuarios,
    usuario,
    autenticado: Boolean(usuario),
    esAdmin: usuario?.rol === 'admin',
    iniciarSesion,
    registrarUsuario,
    cerrarSesion,
    actualizarFavoritosUsuario
    };

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider.');
  }

  return contexto;
}
