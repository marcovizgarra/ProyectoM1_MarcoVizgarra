# ColorFul Studio — Generador Interactivo de Paletas de Colores
**Proyecto Integrador — Módulo 1: Desarrollo Web Full Stack (SoyHenry)**

Aplicación web dinámica desarrollada con tecnologías nativas (HTML, CSS y JS) que permite la generación, conversión y gestión interactiva de paletas cromáticas aleatorias, junto con un historial de favoritos.

🚀 **Sitio publicado: (GitHub Page)** https://marcovizgarra.github.io/ProyectoM1_MarcoVizgarra/

## Tabla de Contenido
* Visión General
* Funcionalidades Principales
* Tecnologías Utilizadas
* Arquitectura de Directorios
* Instrucciones de Ejecución Local
* Guía de Despliegue (GitHub Pages)
* Decisiones de Diseño y Arquitectura Técnica
* Contacto y Redes

## Visión General
ColorFul Studio es una herramienta web orientada a mentes creativas. Permite construir combinaciones de 6, 8 o 9 bloques de color en un solo clic. La aplicación genera colores aleatorios en sistema hexadecimal (HEX) y calcula su representación en el modelo HSL. El usuario puede alternar la notación visible, copiar al portapapeles cualquier valor y guardar hasta 10 paletas en un historial interactivo.

## Funcionalidades Principales

### Requerimientos Base
* **Generación Dinámica:** Disparador central mediante un único botón principal para renderizar paletas aleatorias.
* **Modelos de Color Compatibles:** Algoritmo matemático para generar valores HEX y convertirlos a formato HSL.
* **Cantidades Configurables:** Configuración de la grilla en tamaños de 6, 8 o 9 muestras de color mediante botones en línea.
* **Copiado al Portapapeles:** Interacción directa sobre cada tarjeta con respuesta inmediata de copiado (Clipboard API) y notificación flotante (toast).
* **Almacenamiento Local:** Integración con `localStorage` para guardar un historial visual con las últimas 10 paletas generadas.

### Mejoras y UX
* **Accesibilidad y Contraste:** Cálculo dinámico de contraste (YIQ) que cambia el texto de la tarjeta a blanco o negro garantizando su legibilidad.
* **Dark Mode Nativo:** Implementación de un fondo oscuro base (`#121212`) para resaltar los colores, prevenir la fatiga visual y mantener una estética profesional.
* **Diseño Responsivo e Interfaz Limpia:** Ocultamiento dinámico del historial y transiciones suaves (`hover`) en la botonera y enlaces sociales.

## Tecnologías Utilizadas
* **HTML5:** Estructuración semántica de la interfaz (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`).
* **CSS3:** Estilado modular utilizando Flexbox, CSS Grid y Variables CSS (`:root`), aplicando estilos globales en la etiqueta `body` siguiendo estándares de la industria.
* **JavaScript (ES6):** Manipulación del DOM, sistema de módulos para separar la lógica, y gestión de estado.

## Arquitectura de Directorios
```text
/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── helpers.js
├── assets/
│   └── img/
├── docs/
│   └── uso-ia.md
└── README.mdd