// ===================================================================
// NumberField.jsx — UN CAMPO NUMÉRICO REUTILIZABLE
// -------------------------------------------------------------------
// Props:
//   id        -> identificador; une el <label> con su <input>
//   etiqueta  -> el texto que aparece arriba del campo
//   valor     -> lo que está escrito ahora en el campo
//   alCambiar -> función que se llama cuando el usuario escribe
//
// Esto es un "input controlado": el valor lo guarda React (en App),
// no el navegador. Cada tecla que se escribe actualiza el estado.
// ===================================================================

export default function NumberField({ id, etiqueta, valor, alCambiar }) {
  return (
    <div className="campo">
      {/* htmlFor es el "for" de HTML (en React se escribe así) */}
      <label htmlFor={id}>{etiqueta}</label>

      <input
        id={id}
        type="number"
        min="0"
        step="any" // permite decimales
        value={valor}
        // e.target.value es el texto que hay dentro del input
        onChange={(e) => alCambiar(e.target.value)}
      />
    </div>
  );
}
