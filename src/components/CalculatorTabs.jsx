// ===================================================================
// CalculatorTabs.jsx — LOS BOTONES PARA ELEGIR EL TIPO DE CÁLCULO
// -------------------------------------------------------------------
// Props que recibe de App:
//   tipo      -> el tipo que está seleccionado ahora (ej. 'prestamo')
//   onCambiar -> función para cambiar el tipo (es setTipo de App)
// ===================================================================

// Lista de opciones. Cada una tiene:
//   valor -> lo que usa el código
//   texto -> lo que ve el usuario
const opciones = [
  { valor: 'prestamo', texto: 'Préstamo' },
  { valor: 'simple', texto: 'Interés simple' },
  { valor: 'compuesto', texto: 'Interés compuesto' },
  { valor: 'ahorro', texto: 'Ahorro' },
];

export default function CalculatorTabs({ tipo, onCambiar }) {
  return (
    <div className="tabs">
      {/*
        .map() recorre la lista y crea un <button> por cada opción.
        - key: React la necesita para identificar cada elemento de una lista.
        - className: si la opción es la seleccionada, se le agrega "activo"
          para pintarla de otro color (ver styles.css).
        - onClick: al hacer clic, avisamos a App cuál opción se eligió.
      */}
      {opciones.map((opcion) => (
        <button
          key={opcion.valor}
          type="button"
          className={tipo === opcion.valor ? 'tab activo' : 'tab'}
          onClick={() => onCambiar(opcion.valor)}
        >
          {opcion.texto}
        </button>
      ))}
    </div>
  );
}
