import peliculasIniciales from '../data/peliculas.json';
import categoriasIniciales from '../data/categorias.json';
import usuariosIniciales from '../data/usuarios.json';

const CLAVES = {
  peliculas: 'vivi-peliculas',
  categorias: 'vivi-categorias',
  usuarios: 'vivi-usuarios'
};

// Obtener información del localStorage
export function obtenerDatos(clave, datosIniciales) {
  try {
    const datosGuardados = localStorage.getItem(clave);

    if (datosGuardados !== null) {
      return JSON.parse(datosGuardados);
    }

    // Si no hay información guardada, utilizamos los JSON
    localStorage.setItem(clave, JSON.stringify(datosIniciales));

    return datosIniciales;
  } catch (error) {
    console.error('Error al recuperar los datos:', error);
    return datosIniciales;
  }
}

// Guardar información en localStorage
export function guardarDatos(clave, datos) {
  try {
    localStorage.setItem(clave, JSON.stringify(datos));
    return true;
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    return false;
  }
}

// Obtener películas
export function obtenerPeliculas() {
  return obtenerDatos(CLAVES.peliculas, peliculasIniciales);
}

// Obtener categorías
export function obtenerCategorias() {
  return obtenerDatos(CLAVES.categorias, categoriasIniciales);
}

// Obtener usuarios
export function obtenerUsuarios() {
  return obtenerDatos(CLAVES.usuarios, usuariosIniciales);
}

// Guardar películas
export function guardarPeliculas(peliculas) {
  return guardarDatos(CLAVES.peliculas, peliculas);
}

// Guardar categorías
export function guardarCategorias(categorias) {
  return guardarDatos(CLAVES.categorias, categorias);
}

// Guardar usuarios
export function guardarUsuarios(usuarios) {
  return guardarDatos(CLAVES.usuarios, usuarios);
}
