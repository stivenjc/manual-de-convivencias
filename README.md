# Manual de Convivencia Escolar (Web + PWA)

Página web informativa y **Aplicación Web Progresiva (PWA)** sobre el **Manual de Convivencia Escolar**: clasificación de faltas **Tipo 1, Tipo 2 y Tipo 3**, consecuencias pedagógicas/disciplinarias y posibles soluciones restaurativas.

La web y la aplicación instalada comparten **exactamente el mismo contenido**, funcionan sin conexión a internet (offline) gracias al Service Worker y están diseñadas con paleta **verde, amarillo y blanco**.

## Estructura del proyecto

- `index.html` — Estructura semántica accesible en español (`lang="es"`).
- `styles.css` — Estilos responsive mobile-first en verde, amarillo y blanco (con soporte de modo claro/oscuro y alto contraste).
- `app.js` — Buscador en tiempo real, filtros por tipo, protocolos paso a paso, asistente interactivo *"¿Cómo actuar?"*, autoevaluación (quiz) e instalación PWA.
- `manifest.webmanifest` — Metadatos de la PWA con rutas relativas (`./`) compatibles con GitHub Pages.
- `sw.js` — Service Worker para caché offline.
- `icons/` — Iconos SVG y PNG (`192x192`, `512x512`, `maskable`) + flecha SVG para acordeones.
- `.nojekyll` — Evita el procesamiento de Jekyll en GitHub Pages.

## Despliegue gratuito en GitHub Pages

1. Crea un repositorio público en GitHub (por ejemplo, `manual-convivencia`).
2. Sube todos los archivos de esta carpeta al repositorio en la rama `main`.
3. En GitHub, ve a **Settings → Pages**.
4. En **Build and deployment → Source**, elige **Deploy from a branch**.
5. Selecciona la rama **`main`** y la carpeta **`/ (root)`**, luego haz clic en **Save**.
6. En 1–2 minutos tu sitio y PWA quedarán publicados gratis en `https://TU-USUARIO.github.io/manual-convivencia/`.
