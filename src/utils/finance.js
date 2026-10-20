// ===================================================================
// finance.js — LAS FÓRMULAS
// -------------------------------------------------------------------
// Este archivo NO usa React. Solo tiene funciones de JavaScript normal
// que reciben números y devuelven resultados. Así la matemática queda
// separada de la parte visual y es más fácil de revisar y explicar.
// ===================================================================


// -------------------------------------------------------------------
// 1) formatoDinero
// Convierte un número en texto con formato de dinero.
//   moneda -> 'DOP' (pesos) o 'USD' (dólares). Si no se manda, usa 'DOP'.
// toLocaleString pone el símbolo (RD$ o US$), las comas y 2 decimales.
//
// Ejemplos:
//   formatoDinero(1500)          -> "RD$1,500.00"
//   formatoDinero(1500, 'USD')   -> "US$1,500.00"
// -------------------------------------------------------------------
export function formatoDinero(cantidad, moneda = 'DOP') {
  return cantidad.toLocaleString('es-DO', { style: 'currency', currency: moneda });
}


// -------------------------------------------------------------------
// 1b) convertir
// Pasa una cantidad a LA OTRA moneda usando la tasa del dólar.
//   - Si está en dólares, se MULTIPLICA para pasarla a pesos:
//       US$100 × 61.77 = RD$6,177
//   - Si está en pesos, se DIVIDE para pasarla a dólares:
//       RD$6,177 ÷ 61.77 = US$100
// -------------------------------------------------------------------
export function convertir(cantidad, moneda, tasaDolar) {
  if (moneda === 'USD') {
    return cantidad * tasaDolar; // de dólares a pesos
  }
  return cantidad / tasaDolar; // de pesos a dólares
}


// -------------------------------------------------------------------
// 2) validar
// Revisa lo que escribió el usuario ANTES de calcular.
// - Si algo está mal, devuelve un mensaje de error (un texto).
// - Si todo está bien, devuelve un texto vacío ''.
// Los valores llegan como texto porque vienen de los <input>.
// -------------------------------------------------------------------
export function validar(capital, tasa, plazo, tasaDolar) {
  if (capital === '' || tasa === '' || plazo === '' || tasaDolar === '') {
    return 'Completa todos los campos.';
  }
  if (Number(tasaDolar) <= 0) {
    return 'La tasa del dólar debe ser mayor que cero.';
  }
  if (Number(capital) <= 0) {
    return 'El capital debe ser mayor que cero.';
  }
  if (Number(tasa) < 0) {
    return 'La tasa no puede ser negativa.';
  }
  if (Number(plazo) <= 0) {
    return 'El plazo debe ser mayor que cero.';
  }
  return ''; // sin errores
}


// -------------------------------------------------------------------
// 3) calcular
// Recibe:
//   tipo    -> 'prestamo', 'simple', 'compuesto' o 'ahorro'
//   capital -> dinero inicial (ej. 100000)
//   tasa    -> porcentaje ANUAL (ej. 12 significa 12 %)
//   plazo   -> tiempo en AÑOS (ej. 2, o 1.5 = 18 meses)
//
// Devuelve un objeto con 4 datos que luego muestra ResultCard:
//   titulo  -> nombre del resultado principal
//   valor   -> el número principal (cuota, interés o monto final)
//   total   -> todo el dinero al final
//   interes -> cuánto dinero es solo de intereses
// -------------------------------------------------------------------
export function calcular(tipo, capital, tasa, plazo) {
  // La tasa viene en porcentaje: 12 % se convierte en 0.12
  const tasaDecimal = tasa / 100;

  // --- Interés simple ---------------------------------------------
  // Fórmula: I = P × r × t
  // El interés se calcula siempre sobre el capital inicial.
  if (tipo === 'simple') {
    const interes = capital * tasaDecimal * plazo;
    return {
      titulo: 'Interés generado',
      valor: interes,
      total: capital + interes,
      interes: interes,
    };
  }

  // --- Interés compuesto y Ahorro -----------------------------------
  // Fórmula: A = P × (1 + r/12) ^ (12 × t)
  // Los intereses se suman al capital cada mes ("capitalización mensual").
  // Ahorro usa la misma fórmula: un depósito inicial, sin aportes extra.
  if (tipo === 'compuesto' || tipo === 'ahorro') {
    const total = capital * (1 + tasaDecimal / 12) ** (12 * plazo);
    return {
      titulo: tipo === 'ahorro' ? 'Ahorro proyectado' : 'Monto futuro',
      valor: total,
      total: total,
      interes: total - capital,
    };
  }

  // --- Préstamo (cuotas iguales cada mes) ---------------------------
  // Fórmula: C = P × i / (1 − (1 + i) ^ −n)
  //   i = tasa mensual  (tasa anual ÷ 12)
  //   n = número de meses
  if (tipo === 'prestamo') {
    const meses = Math.max(1, Math.round(plazo * 12)); // mínimo 1 mes
    const tasaMensual = tasaDecimal / 12;

    let cuota;
    if (tasaMensual === 0) {
      // Si la tasa es 0 %, solo se divide el capital entre los meses.
      cuota = capital / meses;
    } else {
      cuota = (capital * tasaMensual) / (1 - (1 + tasaMensual) ** -meses);
    }

    const total = cuota * meses; // lo que se paga en total
    return {
      titulo: `Cuota mensual (${meses} meses)`,
      valor: cuota,
      total: total,
      interes: total - capital,
    };
  }
}
