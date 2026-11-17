
/**
 * Comprueba que un campo tenga contenido.
 */
export function campoObligatorio(valor) {
  return String(valor ?? '').trim() !== '';
}

/**
 * Comprueba que un email tenga un formato válido.
 */
export function validarEmail(email) {
  const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresion.test(String(email).trim());
}

/**
 * Comprueba que una contraseña tenga al menos 6 caracteres.
 */
export function validarPassword(password) {
  return String(password).length >= 6;
}

/**
 * Comprueba que dos contraseñas coincidan.
 */
export function coincidenPasswords(password, confirmacion) {
  return password === confirmacion;
}

/**
 * Comprueba que un número sea válido y positivo.
 */
export function numeroPositivo(valor) {
  return Number.isFinite(Number(valor)) && Number(valor) > 0;
}

/**
 * Comprueba que un año esté dentro de un rango permitido.
 */
export function validarAnio(anio) {
  const numero = Number(anio);
  const anioActual = new Date().getFullYear();

  return Number.isInteger(numero) &&
    numero >= 1888 &&
    numero <= anioActual + 5;
}
