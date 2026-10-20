// ===================================================================
// Header.jsx — EL TÍTULO DE LA PÁGINA
// -------------------------------------------------------------------
// Es el componente más sencillo: no recibe props ni tiene estado.
// Solo muestra el nombre de la app y una frase.
// ===================================================================

export default function Header() {
  return (
    <header className="header">
      <h1>FinanCalc</h1>
      <p>Calcula préstamos, intereses y ahorros.</p>
    </header>
  );
}
