# Notas técnicas — Cantapueblo

Referencia de trabajo para mantener y ampliar el sitio. Es documentación interna: el resumen
público del proyecto está en [`README.md`](./README.md). Este archivo no se publica (figura en
`exclude` de `_config.yml`).

Última revisión: 1 de noviembre de 2026.

## Estado actual

El sitio está publicado y en uso: <https://mxscvz.github.io/cantapueblo/>. Tiene cinco secciones
visibles en el menú:

| Sección | Contenido |
|---|---|
| Inicio | Portada con foto, cifras clave, descripción y enlaces |
| 2026 | Registro de la edición: programa por día, coros, himno, fotos y videos |
| Historia | Hitos, dos carruseles de fotos, mapa de países y diferenciales |
| Quiénes somos | Equipo organizador (cinco personas) |
| Contacto | Email, WhatsApp, Instagram, Facebook, ubicación y preguntas frecuentes |

La sección *Programa* está oculta (ver [Programa oculto](#programa-oculto)).

## Pendientes

**Dominio propio (`cantapueblo.org.ar`).** Lo debe registrar Alejandro Scarpetta en NIC
Argentina, a su nombre como persona, porque la Fundación COPPLA ya no está activa. Si más
adelante se regulariza una entidad, conviene pasar el dominio a ella (consultar a NIC cómo
se hace el cambio de titular). Una vez registrado:

1. Delegar el dominio a un proveedor de DNS (por ejemplo Cloudflare).
2. Cargar cuatro registros `A` a `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y
   `185.199.111.153`, y un `CNAME` de `www` a `mxscvz.github.io`.
3. En *Settings → Pages* del repositorio, escribir el dominio y activar *Enforce HTTPS*.
4. En `_config.yml`, poner `baseurl: ""` y actualizar `url`.
5. Probar los enlaces viejos de `mxscvz.github.io/cantapueblo/…` y actualizar la biografía de
   Instagram.

**Contenido a confirmar con la organización**

- *Cantata Callejera* (sábado 14, 12:00): sale de los documentos internos y no figura en el
  afiche público.
- **Logos de apoyo:** confirmar con cada institución que autoriza el uso de su logo, y pedir
  versiones de mejor calidad de *Mendoza Ciudad* (191×67 px) y *Cepas Turismo* (200×148 px),
  que se ven algo borrosas en pantallas de alta resolución. El orden es una propuesta (gobierno,
  universidad, espacios culturales, asociaciones, empresas).
- *Concierto en las Alturas* (viernes 13): no tiene sede ni datos de entradas cargados.
- Cuál de los conciertos usa EntradaWeb: se deduce de los logos del afiche, solo el del
  Hospital Universitario está confirmado como venta directa.
- Alcance de «Todos cantan *Anhelo*» en el Concierto Final: el programa recibido no aclara si
  son todos los coros o solo los del primer bloque.

**Después del festival (14 de noviembre)**

- Cargar fotos y videos de cada día y el resumen final en `_data/edicion2026.yml`.
- Agregar las fotos de los 19 coros de Mendoza que todavía no tienen.
- Confirmar las fechas de 2027 y definir la sede. La portada muestra dos fechas tentativas
  (23 al 26 de junio y 10 al 13 de noviembre) con el aviso «Muy pronto, novedades»; se editan
  en `es/index.html`, `en/index.html` y `fr/index.html`.

**Identidad**

- El logo (`assets/img/logo.png`) lleva el texto «La Fiesta Coral de América» dentro de la
  imagen, y su texto alternativo en `_includes/nav.html` dice «Cantapueblo 2027». Hay que
  actualizar ambos cuando exista un logo nuevo.

**Limpieza**

- Hay 65 imágenes `.jpg` (8,9 MB) que no se usan: las páginas cargan solo las versiones
  `.webp`. La única `.jpg` en uso es `assets/img/og-image.jpg`.
- Sin uso en las páginas: `assets/js/goal-accordion.js` y sus estilos `.goal-*` en
  `style.css`, `assets/data/programa.json` y `assets/img/world-map-inline.svg`.

**Titularidad.** El repositorio está en una cuenta personal de GitHub y la cuenta de
GoatCounter (analítica) también es personal. A mediano plazo conviene pasarlos a una
organización o dar acceso a más de una persona de la Fundación.

## Arquitectura

```
_config.yml              baseurl /cantapueblo, plugins, exclude
_layouts/default.html    <head> (SEO, hreflang, fuentes), menú, footer y scripts
_includes/
  nav.html               Header, menú y selector de idioma
  footer.html            Footer, con un texto por idioma
  edicion-2026.html      Cuerpo de la página 2026 (lo usan es/en/fr)
  edicion-media.html     Bloque de fotos y videos (lo usa edicion-2026.html)
_data/
  i18n.yml               Ruta y etiqueta de cada sección, por idioma
  edicion2026.yml        Toda la información de la edición 2026
assets/css/              style.css (base), mobile.css, home-hero.css, edicion-2026.css
assets/js/               header-shrink, menu, reveal, carousel, galeria
_tools/optimizar_fotos.py  Convierte fotos a WebP (la carpeta con guion bajo no se publica)
es/  en/  fr/            Páginas de cada idioma
index.html               Redirige según el idioma del navegador (fr, en o es por defecto)
```

Los archivos CSS de página (`home-hero.css`, `edicion-2026.css`) se enlazan desde la propia
página, después de `style.css`. `mobile.css` se carga desde la plantilla, también después de
`style.css`, por lo que pisa sus reglas sin tocarlo.

### Idiomas y rutas

`_data/i18n.yml` guarda, por idioma, la ruta y la etiqueta de cada sección. El selector de
idioma se genera solo a partir de ese archivo.

**El menú, en cambio, se escribe a mano** en `_includes/nav.html`. Para sumar una sección
nueva:

1. Crear la página en `es/`, `en/` y `fr/`, con `lang`, `section`, `title` y `description` en
   el encabezado.
2. Agregar la ruta y la etiqueta en `_data/i18n.yml`, en los tres idiomas.
3. Agregar el enlace en `_includes/nav.html`.

Para sumar un idioma nuevo: agregar su bloque en `i18n.yml`, crear su carpeta con las páginas
y un texto en `_includes/footer.html`.

### Estructura de una sección

Cada `<section class="section">` ocupa todo el ancho; el contenido va dentro de
`<div class="section-inner">` para quedar centrado:

```html
<section class="section reveal">
  <div class="section-inner">
    ...
  </div>
</section>
```

## Edición 2026

Todo sale de `_data/edicion2026.yml`; las tres páginas `2026.html` solo incluyen
`_includes/edicion-2026.html`. El archivo explica en sus comentarios iniciales cómo agregar
fotos y videos. Resumen de su estructura:

- **`ui`**: textos de la página por idioma (títulos, avisos, etiquetas, texto del himno).
- **`origins`**: procedencia de cada coro, por idioma.
- **`choirs`**: un coro por entrada, con `id`, `group` (`exterior`, `provincias` o `mendoza`),
  `name`, `origin`, `director` y, opcionalmente, `photo`.
- **`days`**: cuatro días, cada uno con `events`, `photos` y `videos`.
- **`supporters`**: logos de las instituciones y empresas que apoyan el festival. Se muestran
  al final de la página, bajo el título «Apoyan Cantapueblo estas instituciones y empresas»
  (`ui.supporters_title`). Cada entrada lleva `name`, `file` (en `assets/img/2026/apoyos/`) y,
  si el logo es blanco, `dark: true` para darle fondo oscuro. El orden de la lista es el orden
  en pantalla.
- **`highlights`**: fotos y videos del resumen final. El bloque aparece solo cuando hay
  contenido.

Cada evento tiene `time`, `title` (por idioma), y opcionalmente `subtitle`, `venue`, `note` y
`choirs` (lista de `id`).

- **Entradas:** `access` admite `free` (entrada libre), `tickets` (EntradaWeb, con `ticket_url`
  opcional) y `hospital` (venta directa del Hospital Universitario).
- **Programa por bloques:** `segments` agrupa coros y canciones en orden, como en el Concierto
  Final.

**Fotos de coros:** recorte horizontal de 2:1 (por ejemplo 960×480 px), en
`assets/img/2026/coros/`, y la línea `photo: archivo.webp` en el coro.
`python3 _tools/optimizar_fotos.py CARPETA coros` convierte las fotos a WebP.

**Fotos del festival:** en `assets/img/2026/`, con `python3 _tools/optimizar_fotos.py CARPETA`.
Los videos pueden ser de YouTube (campo `youtube`) o archivos propios cortos en
`assets/video/2026/` (la carpeta todavía no existe: se crea al subir el primero).

**Al agregar un coro**, usar un `id` único y, si participa en conciertos, sumar ese `id` a
la lista `choirs` del evento. Un `id` que no existe rompe el enlace de la lista.

## Programa oculto

La página genérica *Programa* (`es/programa.html`, `en/programme.html`, `fr/programme.html`)
está oculta desde el 30/10/2026, porque el programa detallado vive en la pestaña 2026. Los
archivos siguen en el repositorio, pero:

- figuran en `exclude` de `_config.yml`, por lo que no se publican ni entran al sitemap;
- su enlace en `_includes/nav.html` está comentado;
- el botón de la portada apunta a la página 2026.

Para volver a mostrarla: quitar las tres líneas de `exclude`, descomentar el enlace en
`nav.html` y volver a apuntar el botón de `index.html`. Esa página describía el formato típico
del festival y, en el texto, una edición 2027 sin fechas (hoy desactualizado: la portada ya
muestra fechas tentativas).

## Sistema de diseño

- **Colores**: fondo marfil claro y texto grafito. Los colores del logo (cian, lima, naranja
  y dorado) se usan como acento en detalles, no en bloques grandes.
- **Tipografía**: Space Grotesk en títulos e Inter en el texto.
- **Vidrio esmerilado**: las tarjetas usan las clases `glass` y `glass-hover` (fondo
  semitransparente con `backdrop-filter: blur()`). Hay manchas de color fijas detrás del
  sitio (`body::before`) para que el desenfoque tenga algo que mostrar. En navegadores
  viejos se degrada a una tarjeta semitransparente sin desenfoque.
- **Secciones destacadas**: `section-feature` más una clase de color: `tint-cian`,
  `tint-naranja`, `tint-lima` o `tint-dorado`.
- **Aparición al hacer scroll**: `assets/js/reveal.js` anima los elementos con clase `reveal`
  (con `reveal-1` a `reveal-5` para escalonar). Respeta `prefers-reduced-motion`. Los
  elementos agregados por JavaScript necesitan `window.CantaReveal.observe(elemento)`.
- **Banner de foto** (`.photo-band`): foto de fondo, degradé y texto encima; se usa en
  Historia (`historia-bg.webp`) y en la página 404 (`hero-aconcagua.webp`). Tiene una relación 2,54:1 y un ancho máximo de 1568 px, que es
  la resolución real de la foto; más ancho se vería borroso.
- **Portada**: `.hero-photo-band` con la foto en `hero-home-1400.webp` y
  `hero-home-2000.webp` (`srcset`). El título se ajusta al ancho de la pantalla con `clamp()`
  (`home-hero.css`).

## Componentes

- **Carruseles de fotos** (`.carousel`, `assets/js/carousel.js`): galería horizontal con
  flechas y deslizamiento táctil. Historia tiene dos: el de *Nuestros primeros acordes*
  (19 fotos, `assets/img/carousel2/`) y el de *Nuestro canto se sigue expandiendo* (38 fotos,
  `assets/img/carousel/`). Para que una foto lleve epígrafe se agrega la clase `named` al
  `<figure>` y un `<figcaption>`. Se usan solo las versiones `.webp`.
- **Línea de tiempo** (`.timeline`): una línea vertical con un punto por hito; los colores
  rotan solos.
- **Mapa de países** (en Historia): SVG embebido en el HTML, no como imagen, para que use los
  colores del sitio. Cada país es un `<path>` con `id` ISO de 2 letras. Los resaltados llevan
  `class="highlighted"`. Está copiado en los tres idiomas, así que cualquier cambio se repite
  en `es/historia.html`, `en/history.html` y `fr/histoire.html`. Los países compuestos
  (Argentina, Chile, Ecuador, Suecia, Italia, España, Estados Unidos y Malasia) son un `<g>`
  con varios `<path>`; una regla de CSS ya cubre ese caso. **La atribución de la licencia
  CC BY-SA 3.0 debajo del mapa debe mantenerse**; en celular se muestra en tamaño mínimo
  (`mobile.css`).
- **Preguntas frecuentes** (en Contacto): acordeón nativo con `<details>`, sin JavaScript. Las
  respuestas son generales, sin montos ni plazos.
- **Equipo** (`.team-row`): cinco personas, con foto y rol.
- **Reproductor del himno** (`.audio-block`): "El Canto Grande" en la página 2026, con
  `assets/audio/el-canto-grande.mp3` y `preload="none"` para no descargar 4,6 MB de entrada.
- **Visor de fotos** (`assets/js/galeria.js`): visor a pantalla completa para las fotos de la
  edición, con el elemento nativo `<dialog>`.

## Celular

- `mobile.css` se carga después de `style.css` y tiene dos tramos:
  - hasta **960 px**: header compacto con el menú desplegable;
  - hasta **720 px**: escala de texto y crédito del mapa.
- **Menú** (`menu.js`): el botón de la derecha abre un desplegable con Historia, Quiénes somos
  y Contacto; Inicio y 2026 quedan siempre a la vista. Al bajar, la segunda fila (Inicio y 2026) se
  esconde para ganar espacio y reaparece al abrir el menú. Sin JavaScript no hay botón y los enlaces quedan visibles.
- **Escala de texto**: todos los tamaños están en `rem`; a 390 px de ancho la base es de 14 px
  y el texto de lectura de 16 px.
- Los párrafos de las secciones se justifican en escritorio y se alinean a la izquierda en
  celular.
- `overflow-x: hidden` en `<html>` evita que un elemento ancho agrande toda la página.

## SEO y compartir

- **Open Graph y Twitter Card**: título, descripción e imagen (`og-image.jpg`, 1200×630) al
  compartir un enlace.
- **hreflang**: cada página declara sus versiones en los otros idiomas.
- **Sitemap**: `jekyll-sitemap` lo genera solo; `robots.txt` lo apunta.
- **Carga diferida**: `loading="lazy"` en las fotos fuera de la primera pantalla. Las fotos
  principales no lo llevan.
- **Favicon**: recorte del logo (`favicon-16x16.png`, `favicon-32x32.png`,
  `apple-touch-icon.png`, en la raíz).
- **Analítica**: GoatCounter, sin cookies; se carga desde `_layouts/default.html`.

## Fuentes del contenido

- Textos de *Qué buscamos*, *Nuestras acciones*, diferenciales, cita de bienvenida y datos
  de los hitos: Manual de Procedimientos 2019 y Propuesta para Coros 2026.
- Edición 2026: programa y afiches publicados por la organización, y los documentos y
  mensajes enviados por Alejandro Scarpetta.

## Desarrollo local y publicación

Los comandos están en el [`README.md`](./README.md). Dos puntos prácticos:

- Antes de `git add .`, correr `git status` para revisar qué se va a subir.
- Para ver el sitio en un celular real: `bundle exec jekyll serve --host 0.0.0.0` y abrir
  `http://<IP>:4000/cantapueblo/es/` con `http://`, no `https://`.

## Decisiones de diseño descartadas

- **Carrusel sin marco y con fotos grandes**: se probó y no convenció; se volvió al marco de
  vidrio, con separación entre fotos y epígrafe como pie simple.
