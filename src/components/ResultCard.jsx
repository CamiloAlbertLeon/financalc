// ===================================================================
// ResultCard.jsx — MUESTRA EL RESULTADO (O EL ERROR)
// -------------------------------------------------------------------
// Props que recibe de App:
//   resultado -> objeto { titulo, valor, total, interes } o null
//   error     -> texto con el error, o '' si no hay error
//   moneda    -> 'DOP' o 'USD' (la moneda en que se escribió el capital)
//   tasaDolar -> cuántos pesos vale 1 dólar
//   onGuardar -> función que guarda este resultado en el historial
// ===================================================================

import { formatoDinero, convertir } from '../utils/finance.js';

export default function ResultCard({ resultado, error, moneda, tasaDolar, onGuardar }) {
  // Caso 1: hay un error -> mostramos solo el mensaje en rojo.
  // El "return" termina la función aquí; lo de abajo no se ejecuta.
  if (error) {
    return (
      <section className="tarjeta">
        <p className="error">{error}</p>
      </section>
    );
  }

  // Función corta para no repetir la moneda en cada monto.
  const dinero = (cantidad) => formatoDinero(cantidad, moneda);

  // La OTRA moneda: si estamos en pesos es dólares, y al revés.
  const otraMoneda = moneda === 'DOP' ? 'USD' : 'DOP';

  // El resultado principal pasado a la otra moneda.
  const equivalente = convertir(resultado.valor, moneda, tasaDolar);

  // Caso 2: todo bien -> mostramos los números con formato de dinero.
  return (
    <section className="tarjeta">
      {/* Resultado principal, en grande */}
      <p className="subtitulo">{resultado.titulo}</p>
      <p className="valor-resultado">{dinero(resultado.valor)}</p>
      <p className="equivalente">
        Equivale a {formatoDinero(equivalente, otraMoneda)}
      </p>

      {/* Detalles */}
      <div className="fila">
        <span>Monto total</span>
        <strong>{dinero(resultado.total)}</strong>
      </div>
      <div className="fila">
        <span>Intereses</span>
        <strong>{dinero(resultado.interes)}</strong>
      </div>

      {/* Al hacer clic se llama a la función onGuardar que vive en App */}
      <button type="button" className="boton" onClick={onGuardar}>
        Guardar en historial
      </button>

      <p className="nota">
        Cálculo educativo. No incluye comisiones, impuestos ni seguros.
        Tasa usada: US$1 = RD${tasaDolar}.
      </p>
    </section>
  );
}
