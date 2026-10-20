// ===================================================================
// historial.js — GUARDAR Y CARGAR EL HISTORIAL
// -------------------------------------------------------------------
// Usamos localStorage: un pequeño "almacén" que tiene el navegador.
// Lo que se guarda ahí NO se borra al cerrar o recargar la página.
//
// localStorage solo guarda TEXTO, por eso:
//   - JSON.stringify(lista) convierte la lista en texto para guardarla.
//   - JSON.parse(texto)     convierte el texto otra vez en lista.
//
// Usamos try/catch porque en algunos casos (modo incógnito, permisos
// bloqueados) localStorage puede fallar. Si falla, la app sigue
// funcionando, solo que sin guardar.
// ===================================================================

// Nombre con el que se guarda el historial dentro de localStorage.
const CLAVE = 'financalc-historial';


// Lee el historial guardado. Si no hay nada, devuelve una lista vacía [].
export function cargarHistorial() {
  try {
    const texto = localStorage.getItem(CLAVE);
    if (texto === null) {
      return []; // primera vez: todavía no hay nada guardado
    }
    return JSON.parse(texto);
  } catch {
    return [];
  }
}


// Guarda la lista completa del historial.
export function guardarHistorial(lista) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch {
    // Si no se pudo guardar, no hacemos nada.
  }
}
