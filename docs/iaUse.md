# Documentación: Uso de Inteligencia Artificial (Gemini)

Durante el desarrollo de **ColorFul Studio**, utilicé la Inteligencia Artificial (Gemini) como una herramienta de "Pair Programming" y mentoría. El objetivo principal fue destrabar conceptos matemáticos complejos para la conversión de colores y desmitificar buenas prácticas de CSS. 

A continuación, detallo los prompts y consultas clave que guiaron el proyecto:

### 🧩 1. Lógica Compleja y Helpers (JavaScript)

La IA fue fundamental para entender la manipulación matemática de los modelos de color.

| Consulta / Prompt | Propósito | Resultado y Aprendizaje |
| :--- | :--- | :--- |
| *"¿Cómo genero un código HEX aleatorio de 6 dígitos en JS?"* | Construir la función principal del generador. | Creación de la función `generateRandomHexColor`, aprendiendo a iterar con un bucle `for` sobre un array de caracteres hexadecimales (`0-F`). |
| *"¿Cómo convierto un color HEX a HSL matemáticamente en JS?"* | Cumplir con el requerimiento de múltiples formatos. | Entendí el algoritmo espacial de color, extrayendo los valores RGB y calculando el tono (Hue), saturación (Saturation) y luminosidad (Lightness) para la función `rgbToHsl`. |
| *"¿Cómo calculo si el texto debe ser blanco o negro sobre un color?"* | Asegurar la accesibilidad visual (WCAG). | Descubrí la fórmula del índice **YIQ**, que calcula la luminosidad percibida por el ojo humano multiplicando los canales RGB por valores específicos, implementado en `getContrastColor`. |

### 🎨 2. Desmitificando CSS

Consulté a la IA sobre comportamientos extraños de CSS y "mitos" de malas prácticas, obteniendo explicaciones que cambiaron la estructura del proyecto.

*   **El mito de estilizar el `body`:** Creía que darle formato directamente a la etiqueta `body` era una mala práctica. La IA me aclaró que hacerlo en una hoja de estilos externa es el estándar de la industria; las verdaderas malas prácticas son usar estilos en línea (`style="..."`) o abusar del selector universal `*` para pintar fondos[cite: 2].
*   **Protección visual y Variables CSS:** Al pedir un fondo oscuro porque el blanco "me quemaba los ojos", aprendí a usar `:root` para declarar variables globales y descubrí que usar un gris oscuro (`#121212`) reduce la fatiga visual mucho mejor que el negro puro (`#000000`)[cite: 2].
*   **El dilema del `100vw` y el scroll horizontal:** Al maquetar la grilla, apareció un molesto scroll horizontal. La IA me explicó que `100vw` fuerza al ancho a incluir el espacio que ocupa la barra de scroll vertical, desbordando la pantalla. Se solucionó simplemente cambiando a `width: 100%`.

### 🏗️ 3. Arquitectura y Buenas Prácticas

*   **Nomenclatura y Convenciones:** Validé la estructura híbrida de mi código: usar estrictamente `kebab-case` para las clases e IDs en HTML/CSS, y `camelCase` para la lógica en JavaScript[cite: 1].
*   **Git y Conventional Commits:** Tras refactorizar el HTML al nuevo estándar de nombres y cambiar el selector desplegable por botones en línea, utilicé la IA para generar nombres de commits semánticos (ej. `refactor:` o `feat:`) que reflejaran exactamente los cambios realizados[cite: 1].
*   **Validación de UI:** Aunque cambié un selector desplegable por botones en línea por preferencia de diseño, la IA me ayudó a confirmar que esto seguía cumpliendo con los requerimientos de la consigna, siempre y cuando existiera un único botón principal de generación[cite: 1].