// ===================================================================
// CalculatorForm.jsx — EL FORMULARIO CON LOS 3 CAMPOS
// -------------------------------------------------------------------
// Props que recibe de App:
//   moneda                         -> 'DOP' o 'USD' (moneda elegida)
//   capital, tasa, plazo           -> lo que está escrito en cada campo
//   setCapital, setTasa, setPlazo  -> funciones para cambiar cada valor
//
// En vez de repetir el mismo <input> tres veces, usamos el componente
// NumberField. Eso es REUTILIZAR un componente.
// ===================================================================

import NumberField from './NumberField.jsx';

export default function CalculatorForm({ moneda, capital, tasa, plazo, setCapital, setTasa, setPlazo }) {
  // El símbolo cambia según la moneda elegida.
  // Esto se llama "operador ternario":  condición ? siEsVerdad : siEsFalso
  const simbolo = moneda === 'USD' ? 'US$' : 'RD$';

  return (
    <section className="tarjeta">
      <NumberField
        id="capital"
        etiqueta={`Capital inicial (${simbolo})`}
        valor={capital}
        alCambiar={setCapital}
      />

      <NumberField
        id="tasa"
        etiqueta="Tasa de interés anual (%)"
        valor={tasa}
        alCambiar={setTasa}
      />

      <NumberField
        id="plazo"
        etiqueta="Plazo en años (ej. 1.5 = 18 meses)"
        valor={plazo}
        alCambiar={setPlazo}
      />
    </section>
  );
}
