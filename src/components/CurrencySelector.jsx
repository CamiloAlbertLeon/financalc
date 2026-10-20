// ===================================================================
// CurrencySelector.jsx — ELEGIR LA MONEDA (RD$ o US$)
// -------------------------------------------------------------------
// Props que recibe de App:
//   moneda          -> la moneda elegida: 'DOP' (pesos) o 'USD' (dólares)
//   onCambiarMoneda -> función para cambiar la moneda (setMoneda de App)
//   tasaDolar       -> cuántos pesos vale 1 dólar (texto del input)
//   setTasaDolar    -> función para cambiar la tasa del dólar
//
// La moneda elegida es la del capital y la de los resultados.
// La tasa del dólar sirve para mostrar cuánto equivale el resultado
// en la otra moneda.
// ===================================================================

import NumberField from './NumberField.jsx';

export default function CurrencySelector({ moneda, onCambiarMoneda, tasaDolar, setTasaDolar }) {
  return (
    <section className="tarjeta">
      <p className="subtitulo">Moneda</p>

      {/* Dos botones. Usan los mismos estilos que las pestañas de arriba. */}
      <div className="tabs">
        <button
          type="button"
          className={moneda === 'DOP' ? 'tab activo' : 'tab'}
          onClick={() => onCambiarMoneda('DOP')}
        >
          Pesos (RD$)
        </button>

        <button
          type="button"
          className={moneda === 'USD' ? 'tab activo' : 'tab'}
          onClick={() => onCambiarMoneda('USD')}
        >
          Dólares (US$)
        </button>
      </div>

      <NumberField
        id="tasaDolar"
        etiqueta="Tasa del dólar (RD$ por cada US$1)"
        valor={tasaDolar}
        alCambiar={setTasaDolar}
      />
    </section>
  );
}
