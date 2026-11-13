# Despensa — PWA para iPhone

Versión estática (PWA) de la app privada **Despensa**: despensa, recetas mexicanas y lista del Súper. Es la misma idea que la app de Muse, pero en archivos estáticos para publicarla en GitHub Pages e instalarla en el iPhone.

## Qué hace

- **Despensa**: agrega lo que compras de mandado (nombre, cantidad con +/−, unidad, categoría), edita y borra. Tiene botones rápidos de "lo de siempre" (huevo, jitomate, tortilla, frijol, etc.).
- **Recetas**: recetario de 19 recetas mexicanas reales con ingredientes y pasos. Te dice cuáles puedes hacer hoy con lo que tienes y, en cada receta, exactamente qué ingredientes te faltan. La sal, el aceite y el agua no se cuentan como faltantes. Cocinar una receta descuenta los ingredientes usados de tu despensa.
- **Modo Súper**: prendido por defecto y se puede apagar. Cuando un producto se acaba (botón "Se acabó", cantidad llega a 0, o se gasta al cocinar), se añade solo a la lista de compras.
- **Súper (lista de compras)**: productos por comprar, con precio editable en MXN, total de lo que vas a gastar, marcar como comprado, y lo comprado regresa a tu despensa.

## Precios: importante

⚠️ **En esta versión PWA no hay búsqueda de precios en vivo.** Los precios se escriben a mano en la lista del Súper y la app calcula el total con ellos. Si un producto no tiene precio, el total se marca como parcial.

## Datos

- Los datos viven solo en este teléfono, en `localStorage`, clave `despensaPwa.v1`.
- La despensa y la lista empiezan vacías.
- La app de Muse y esta PWA **no** comparten datos: lo que registres en una no aparece en la otra.

## Publicar en GitHub Pages

1. Sube estos archivos a un repositorio (por ejemplo `Despensa`, rama `main`, carpeta raíz).
2. Activa GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
3. Abre el sitio en Safari del iPhone → Compartir → **"Agregar a pantalla de inicio"**.

Las rutas son relativas, así que funciona bajo el subdominio `/Despensa/`. El service worker (`sw.js`) guarda el app shell para usarla sin conexión.

## Archivos

- `index.html` — estructura de la app
- `styles.css` — diseño móvil, letra grande
- `app.js` — lógica (despensa, recetas, Modo Súper, total)
- `manifest.webmanifest` — nombre "Despensa", iconos, colores
- `sw.js` — caché offline (`despensa-v1`)
- `icon.svg` / `icon-512.png` — iconos
- `README-PWA.md` — este archivo

La Paz, BCS.
