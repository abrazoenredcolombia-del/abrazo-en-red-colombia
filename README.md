# Abrazo en Red Colombia

Landing page del directorio de facilitadores que ofrecen acompañamiento solidario
a las personas afectadas por el terremoto en Colombia.

Es un sitio estático (HTML + CSS + un poco de JS). No necesita instalación ni build.

## Estructura

```
abrazoenredcolombia/
├── index.html                  ← la página
├── assets/
│   ├── css/styles.css          ← estilos
│   ├── js/main.js              ← año del footer, sombra del header, animaciones
│   └── img/                    ← fotos recortadas en cuadrado (640×640 .webp)
└── fotos/                      ← originales sin tocar
```

Las 6 fotos en uso están en WebP (22–53 KB cada una, contra ~1 MB de los PNG
originales). Los originales siguen intactos en `fotos/` por si hay que rehacerlas.

## Ver la página

Abre `index.html` con doble clic, o levanta un servidor local:

```powershell
python -m http.server 8000
# luego abre http://localhost:8000
```

## Publicarla

Al ser estática, sirve cualquier hosting gratuito: Netlify (arrastrar la carpeta),
Vercel, GitHub Pages o Cloudflare Pages. Solo hay que subir la carpeta completa.

## Diagramación

Tres variables en `:root` gobiernan todo el ancho de la página:

| Variable | Valor | Para qué |
|---|---|---|
| `--maxw` | 1400px | rejillas anchas: tarjetas, pasos, header, footer |
| `--maxw-text` | 740px | columnas de lectura (clase `.reading`), tope de ~75 caracteres por línea |
| `--gutter` | `clamp(20px, 3vw, 40px)` | margen lateral; crece con la pantalla |

La regla de alineación es constante: **títulos centrados, texto corrido alineado a la
izquierda dentro de una columna centrada.**

Las tarjetas y los pasos usan flex con `flex-grow: 0` y anchos por columna calculados
(`calc((100% - var(--gap) * 2) / 3)`). Así todas las piezas miden exactamente lo mismo
y la última fila incompleta queda centrada — grid la dejaría pegada a la izquierda.
Los cortes son 1 columna, 2 columnas desde 700px y 3 desde 1080px.

## Agregar un nuevo facilitador

1. Deja su foto en `assets/img/nombre-apellido.webp` (cuadrada, ~640×640).
   Si no tienes cómo generar WebP, sirve igual un `.jpg`; solo hay que cambiar
   la extensión en el `src` del HTML. Para convertir, la vía más simple es
   [squoosh.app](https://squoosh.app) (calidad ~85).
2. En `index.html`, copia una tarjeta completa (`<article class="card"> … </article>`)
   dentro de `<div class="cards">` y cambia:
   - `src` y `alt` de la imagen, y `data-initials` del `div.avatar`
   - nombre (`h3`), rol (`.role`) y país (`.country`)
   - la descripción, dentro del `<details class="bio">`
   - la disponibilidad, en el bloque `.meta`
   - el enlace de WhatsApp

La descripción usa `<details>` de HTML: viene plegada para que las tarjetas queden
cortas y parejas, y se abre al tocar "Cómo te puede acompañar". Es un elemento nativo,
así que funciona sin JavaScript y es accesible por teclado.

Las tarjetas no muestran el número de teléfono: el contacto es únicamente por el botón
de WhatsApp, que ya lleva el número dentro del enlace.

### Formato del enlace de WhatsApp

```
https://wa.me/57XXXXXXXXXX?text=Mensaje%20precargado
```

El número va **sin `+`, sin espacios y con indicativo del país** (`57` para Colombia).
El texto después de `?text=` va codificado para URL (los espacios como `%20`,
las tildes como `%C3%A1`, etc.).

### Bandera de otro país

La bandera es un SVG en línea dentro de `<span class="flag">`. Para un país distinto
a Colombia, reemplaza los `<rect>` por las franjas correspondientes; el contenedor
ya recorta en círculo.
