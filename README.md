# CV — Ángel Sampayo

Sitio de CV personal, estático, listo para GitHub Pages.

## Estructura

```
index.template.html   Plantilla con marcadores <!-- @include sections/x.html -->
index.html             Generado por el build (no editar a mano)
sections/               Una sección del CV por archivo (nav, hero, work, about...)
css/style.css           Todos los estilos
js/data.js              Fechas/semestre/año — ÚNICO lugar a editar para eso
js/main.js              Interacción (nav, reveals, tilt del teléfono, parallax)
assets/img/             Imágenes locales (sin depender de links externos)
scripts/build.js        Junta index.template.html + sections/ -> index.html
```

## Cómo editar una sección

Cada sección del CV vive en su propio archivo dentro de `sections/`:

| Sección | Archivo |
|---|---|
| Barra de navegación | `sections/nav.html` |
| Hero (título, rol, botones) | `sections/hero.html` |
| Proyectos destacados | `sections/work.html` |
| Sobre mí | `sections/about.html` |
| Experiencia | `sections/experience.html` |
| Capacidades | `sections/capabilities.html` |
| Educación | `sections/education.html` |
| Contacto | `sections/contact.html` |
| Pie de página | `sections/footer.html` |

Edita el archivo que corresponda y vuelve a correr el build (ver abajo). **No edites `index.html` directamente** — se sobreescribe en cada build.

## Datos que se actualizan solos

`js/data.js` calcula automáticamente, sin tocar el HTML:

- Año actual (`currentYear`) — usado en copyright, códigos de proyecto, etc.
- Años desde que empezaste a programar (`buildingSinceYear`, `yearsBuilding`)
- Semestre actual de la carrera (`semesterNumberPadded`, `semesterOrdinal`, `semesterLabel`), calculado a partir de la fecha de inicio de la carrera
- Rango de años de la carrera (`degreeStartYear`, `degreeEndYear`)

Cualquier elemento HTML con `data-dynamic="clave"` se rellena automáticamente en tiempo de carga con el valor correspondiente de `CV_DATA` (ver `js/main.js` → `applyDynamicData`).

Para agregar un nuevo dato dinámico:
1. Calcúlalo en `js/data.js` y agrégalo al objeto que retorna.
2. En el HTML, pon `<span data-dynamic="tuClave">valor por defecto</span>`.

## Build

El sitio final (`index.html`) se genera juntando la plantilla con las secciones:

```bash
npm run build
# o directamente:
node scripts/build.js
```

Corre esto **cada vez que edites algo dentro de `sections/`**, antes de hacer commit o probar en el navegador.

## Ver el sitio en local

Como `index.html` ya viene pre-armado por el build, puedes simplemente abrirlo con doble clic o:

```bash
npm run build
npm run serve
```

## Despliegue a GitHub Pages

Este repo incluye un workflow (`.github/workflows/deploy.yml`) que:

1. Corre `node scripts/build.js` (regenera `index.html` desde `sections/`).
2. Publica el contenido del repo a GitHub Pages.

Se dispara automáticamente en cada push a `main`. Para activarlo:

1. Sube este repo a GitHub.
2. Ve a **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**.
4. Push a `main` y espera a que corra el workflow.

No hace falta rama `gh-pages` ni configuración adicional — el workflow ya deja `index.html` sincronizado aunque olvides correr el build localmente.

## CV descargable

El PDF vive en `assets/cv/angel-sampayo-cv.pdf`. El botón "CV ↗" del nav (`sections/nav.html`) y el link "CV" del footer (`sections/footer.html`) apuntan ahí con el atributo `download`. Para actualizarlo, reemplaza ese archivo (mismo nombre) y no hace falta tocar el HTML.
