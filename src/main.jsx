// ===================================================================
// main.jsx — EL PUNTO DE ENTRADA
// -------------------------------------------------------------------
// Es el primer archivo que se ejecuta. Busca en index.html el
// <div id="root"> y dibuja dentro el componente <App />.
// ===================================================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css'; // los estilos de toda la página

createRoot(document.getElementById('root')).render(
  // StrictMode ayuda a detectar errores mientras programamos.
  <StrictMode>
    <App />
  </StrictMode>
);
