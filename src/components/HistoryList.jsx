// ===================================================================
// HistoryList.jsx — LA LISTA DE CÁLCULOS GUARDADOS
// -------------------------------------------------------------------
// Props que recibe de App:
//   historial -> lista (array) de cálculos guardados. Cada uno tiene:
//                { id, fecha, titulo, valor, datos }
//   onBorrar  -> función que vacía el historial
// ===================================================================

export default function HistoryList({ historial, onBorrar }) {
  return (
    <section className="tarjeta">
      {/* Encabezado: título a la izquierda, botón a la derecha */}
      <div className="historial-encabezado">
        <p className="subtitulo">Historial</p>

        {/* El botón "Borrar" solo aparece si hay algo en el historial */}
        {historial.length > 0 && (
          <button type="button" className="boton-texto" onClick={onBorrar}>
            Borrar todo
          </button>
        )}
      </div>

      {/* Si la lista está vacía mostramos un mensaje. */}
      {historial.length === 0 && (
        <p className="nota">Aún no has guardado ningún cálculo.</p>
      )}

      {/* .map() crea un <li> por cada cálculo guardado. */}
      <ul className="historial">
        {historial.map((item) => (
          <li key={item.id}>
            <div className="fila-historial">
              <span>{item.titulo}</span>
              <strong>{item.valor}</strong>
            </div>
            <small>
              {item.datos} · {item.fecha}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
