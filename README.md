# Cantapueblo

Sitio web oficial de **Cantapueblo — La Fiesta Coral de Latinoamérica**, encuentro coral
internacional que se realiza en Mendoza, Argentina, desde 1989.

**Sitio en vivo:** <https://cantapueblo.musica.ar>

## Características

- Sitio estático y trilingüe: español, inglés y francés.
- Registro de la edición en curso (programa, coros, fotos y videos), que se completa
  editando un solo archivo de datos.
- Diseño responsive, con menú desplegable en celular.
- Sin frameworks ni herramientas de compilación: HTML, CSS y JavaScript simples.

## Tecnología

| Capa | Herramienta |
|---|---|
| Generador de sitio | [Jekyll](https://jekyllrb.com/) 4.4 (`jekyll-sitemap` para el sitemap) |
| Hosting | GitHub Pages, publicado desde la rama `main` |
| Dominio | `cantapueblo.musica.ar` (registrado en NIC Argentina, configurado en el archivo `CNAME`) |
| Estilos y scripts | CSS y JavaScript propios, sin dependencias |
| Tipografías | Space Grotesk e Inter (Google Fonts) |
| Analítica | [GoatCounter](https://www.goatcounter.com/) |

## Estructura

```
_config.yml              Configuración del sitio
_layouts/default.html    Plantilla común a todas las páginas
_includes/               Piezas reutilizables (menú, footer, página 2026)
_data/
  i18n.yml               Rutas y etiquetas del menú, por idioma
  edicion2026.yml        Programa, coros, fotos y videos de la edición 2026
_tools/                  Utilidades de mantenimiento (no se publican)
assets/                  Estilos, scripts, imágenes, audio y video
es/  en/  fr/            Contenido de cada página, por idioma
index.html               Redirige al idioma del navegador
CNAME                    Dominio propio para GitHub Pages
```

## Desarrollo local

Requisitos: [Ruby](https://www.ruby-lang.org/) y [Bundler](https://bundler.io/).

```bash
bundle install
bundle exec jekyll serve
```

El sitio queda en <http://localhost:4000/> y se regenera al guardar cada cambio.

Para probarlo desde un celular conectado a la misma red Wi‑Fi:

```bash
bundle exec jekyll serve --host 0.0.0.0
```

y abrir `http://<IP-de-la-computadora>:4000/es/` desde el celular. En macOS la IP
se obtiene con `ipconfig getifaddr en0`. La dirección debe empezar con `http://`, no `https://`.

## Publicación

Cada `push` a `main` reconstruye y publica el sitio automáticamente. El despliegue demora
entre uno y dos minutos y se puede seguir en la pestaña *Actions* del repositorio. Los mensajes
de commit siguen el formato `tipo: descripción corta`, con los tipos `feat`, `fix`, `style`,
`chore` y `docs`.

La guía completa de componentes, estilos y decisiones de diseño está en [`NOTES.md`](./NOTES.md).

## Créditos

- Mapa mundial de la sección *Coros de todo el mundo*: [Al MacDonald](https://commons.wikimedia.org/wiki/File:World_map_-_low_resolution.svg),
  editado por Fritz Lekschas, bajo licencia [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
  La atribución debe mantenerse en la página.
- Los textos, fotografías, logos y el audio del himno pertenecen a Cantapueblo.
  No se define una licencia de reutilización.
