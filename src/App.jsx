// ===================================================================
// App.jsx — EL COMPONENTE PRINCIPAL
// -------------------------------------------------------------------
// App es el "padre" de todos los demás componentes. Aquí:
//   1. Se guardan los datos (el ESTADO) con useState.
//   2. Se calcula el resultado con las funciones de finance.js.
//   3. Se guarda el historial en el navegador con useEffect.
//   4. Se le pasan los datos a los componentes hijos mediante PROPS.
// ===================================================================

// useState  -> guarda datos que cambian.
// useEffect -> ejecuta algo DESPUÉS de que cambia un dato (ej. guardarlo).
import { useEffect, useState } from 'react';

// Componentes hijos (cada uno es una parte de la pantalla).
import Header from './components/Header.jsx';
import CalculatorTabs from './components/CalculatorTabs.jsx';
import CalculatorForm from './components/CalculatorForm.jsx';
import CurrencySelector from './components/CurrencySelector.jsx';
import ResultCard from './components/ResultCard.jsx';
import HistoryList from './components/HistoryList.jsx';

// Funciones normales de JavaScript (no tienen nada de React).
import { validar, calcular, formatoDinero } from './utils/finance.js';
import { cargarHistorial, guardarHistorial } from './utils/historial.js';

export default function App() {
  // ---------------------------------------------------------------
  // ESTADO
  // useState devuelve dos cosas: [valorActual, funciónParaCambiarlo]
  // Cuando se llama a la función "set...", React vuelve a dibujar la
  // pantalla con el valor nuevo.
  // ---------------------------------------------------------------
  const [tipo, setTipo] = useState('prestamo'); // cálculo elegido
  const [capital, setCapital] = useState('100000'); // dinero inicial (en la moneda elegida)
  const [tasa, setTasa] = useState('12'); // % anual
  const [plazo, setPlazo] = useState('2'); // años

  const [moneda, setMoneda] = useState('DOP'); // 'DOP' = pesos, 'USD' = dólares
  const [tasaDolar, setTasaDolar] = useState('61.77'); // RD$ por cada US$1

  // El historial empieza con lo que haya guardado en el navegador.
  // Le pasamos la FUNCIÓN cargarHistorial (sin paréntesis) para que
  // React la ejecute una sola vez, al abrir la página.
  const [historial, setHistorial] = useState(cargarHistorial);

  // ---------------------------------------------------------------
  // GUARDAR EL HISTORIAL AUTOMÁTICAMENTE
  // useEffect(función, [historial]) significa:
  // "cada vez que cambie historial, ejecuta esta función".
  // Así, al agregar o borrar, la lista se guarda sola en el navegador.
  // ---------------------------------------------------------------
  useEffect(() => {
    guardarHistorial(historial);
  }, [historial]);

  // ---------------------------------------------------------------
  // CÁLCULO
  // Esto se ejecuta cada vez que React dibuja la pantalla, o sea,
  // cada vez que el usuario cambia algo. Por eso el resultado se
  // actualiza solo, sin necesidad de un botón "Calcular".
  // ---------------------------------------------------------------
  const error = validar(capital, tasa, plazo, tasaDolar);

  // Si hay error no calculamos (resultado = null).
  // Si no hay error, convertimos los textos a números con Number().
  let resultado = null;
  if (error === '') {
    resultado = calcular(tipo, Number(capital), Number(tasa), Number(plazo));
  }

  // ---------------------------------------------------------------
  // FUNCIONES DEL HISTORIAL
  // ---------------------------------------------------------------

  // Se ejecuta al pulsar "Guardar en historial".
  function agregarAlHistorial() {
    // Creamos un objeto con lo que queremos recordar.
    // Guardamos los textos YA FORMATEADOS para mostrarlos tal cual.
    const nuevo = {
      id: Date.now(), // número único (milisegundos actuales)
      fecha: new Date().toLocaleString('es-DO'), // ej. "19/10/2026, 8:15 p. m."
      titulo: resultado.titulo,
      valor: formatoDinero(resultado.valor, moneda),
      datos: `${formatoDinero(Number(capital), moneda)} al ${tasa}% por ${plazo} años`,
    };

    // [nuevo, ...historial] crea una lista NUEVA: el nuevo primero
    // y después todos los anteriores ("..." copia los elementos).
    // .slice(0, 10) deja solo los 10 más recientes.
    setHistorial([nuevo, ...historial].slice(0, 10));
  }

  // Se ejecuta al pulsar "Borrar todo": deja la lista vacía.
  function borrarHistorial() {
    setHistorial([]);
  }

  // ---------------------------------------------------------------
  // LO QUE SE VE EN PANTALLA (JSX)
  // Cada componente recibe sus datos como props, por ejemplo:
  // <ResultCard resultado={resultado} />  -> ResultCard recibe "resultado"
  // ---------------------------------------------------------------
  return (
    <main className="contenedor">
      <Header />

      <CalculatorTabs tipo={tipo} onCambiar={setTipo} />

      {/* La moneda va antes del formulario porque decide en qué
          moneda se escribe el capital. */}
      <CurrencySelector
        moneda={moneda}
        onCambiarMoneda={setMoneda}
        tasaDolar={tasaDolar}
        setTasaDolar={setTasaDolar}
      />

      <CalculatorForm
        moneda={moneda}
        capital={capital}
        tasa={tasa}
        plazo={plazo}
        setCapital={setCapital}
        setTasa={setTasa}
        setPlazo={setPlazo}
      />

      <ResultCard
        resultado={resultado}
        error={error}
        moneda={moneda}
        tasaDolar={Number(tasaDolar)}
        onGuardar={agregarAlHistorial}
      />

      <HistoryList historial={historial} onBorrar={borrarHistorial} />
    </main>
  );
}
