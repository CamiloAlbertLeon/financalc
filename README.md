# FinanCalc — Calculadora financiera con React

Proyecto educativo hecho con React, Vite y CSS simple (sin librerías de diseño).

## Cómo ejecutarlo
Necesitas Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
```
Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## ¿Qué hace cada archivo?

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Página base. Tiene el `<div id="root">` donde React dibuja todo. |
| `src/main.jsx` | Punto de entrada. Dibuja `<App />` dentro de `#root`. |
| `src/App.jsx` | Componente padre. Guarda los datos (estado), calcula y reparte props. |
| `src/components/Header.jsx` | Título y frase de la app. |
| `src/components/CalculatorTabs.jsx` | Los 4 botones para elegir el tipo de cálculo. |
| `src/components/CalculatorForm.jsx` | El formulario con los 3 campos. |
| `src/components/NumberField.jsx` | Un campo numérico reutilizable (se usa 3 veces). |
| `src/components/CurrencySelector.jsx` | Elige la moneda (RD$ o US$) y la tasa del dólar. |
| `src/components/ResultCard.jsx` | Muestra el resultado (o el error) y el botón "Guardar en historial". |
| `src/components/HistoryList.jsx` | Muestra los últimos 10 cálculos guardados y el botón "Borrar todo". |
| `src/utils/finance.js` | Las fórmulas y el formato de dinero (con conversión a dólares). JavaScript puro, sin React. |
| `src/utils/historial.js` | Guarda y carga el historial en `localStorage` (el almacén del navegador). |
| `src/styles.css` | Todo el diseño (tema oscuro). |

## Cómo funciona (paso a paso)
1. `App` guarda 4 datos con `useState`: `tipo`, `capital`, `tasa` y `plazo`.
2. El usuario escribe en un campo → `NumberField` llama a `setCapital` (o `setTasa`, `setPlazo`).
3. Al cambiar el estado, React vuelve a ejecutar `App`.
4. `App` llama a `validar()`. Si hay error, se muestra en `ResultCard`.
5. Si no hay error, `App` llama a `calcular()` y le pasa el resultado a `ResultCard`.

Por eso el resultado se actualiza solo mientras escribes: no hace falta un botón "Calcular".

### Pesos a dólares
La moneda elegida (RD$ o US$) es la del capital y la de los resultados; la etiqueta "Capital inicial" cambia su símbolo según el botón. Debajo del resultado, `convertir()` muestra cuánto equivale en la otra moneda: de pesos a dólares se divide entre la tasa (RD$6,177 ÷ 61.77 = US$100) y de dólares a pesos se multiplica. La tasa se puede editar porque cambia cada día.

### Historial
1. Al pulsar "Guardar en historial", `App` crea un objeto con el resultado y lo pone primero en la lista (`setHistorial`).
2. Un `useEffect` detecta que `historial` cambió y llama a `guardarHistorial()`, que lo guarda en `localStorage` como texto (JSON).
3. Al abrir la página otra vez, `useState(cargarHistorial)` lee lo guardado. Por eso no se pierde al recargar o cerrar el navegador.

## Fórmulas
La tasa se escribe como porcentaje **anual** (12 = 12 %) y se divide entre 100. El plazo va en **años**.

- **Interés simple:** `I = P × r × t`
- **Interés compuesto (mensual):** `A = P × (1 + r/12) ^ (12 × t)`
- **Ahorro:** misma fórmula que el compuesto; un depósito inicial sin aportes extra.
- **Préstamo (cuotas iguales):** `C = P × i / (1 − (1 + i) ^ −n)`, con `i = r/12` y `n = meses`. Si la tasa es 0, `C = P / n`.

Los cálculos son aproximados y no incluyen comisiones, impuestos ni seguros.

## Ideas para mejorarlo
1. Tabla de amortización para el préstamo.
2. Aportes mensuales en el ahorro.
3. Obtener la tasa del dólar automáticamente desde internet.
