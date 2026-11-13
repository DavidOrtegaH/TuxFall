# Validación de desarrollo 0.1.0

Fecha: 13 de noviembre de 2026. Esto no declara una versión estable ni sustituye la revisión de la futura 1.0.

- `npm test`: 14 pruebas correctas. Carriles, velocidad y aceleración, obstáculos, colisiones, puntuación, pausa, continuidad de paleta y cookies (consentimiento, rechazo, caducidad, revocación, bloqueo del navegador).
- `npm run build`: genera `dist` incluyendo política de cookies, licencia y avisos de autoría.
- `node --check src/main.js` y `node --check src/render.js`: correctos.
- Navegador local: comprobados inicio con Play, actualización del marcador, fin de partida con puntuación y reintento, y panel de configuración de cookies con opciones equivalentes. No se modificó una preferencia de cookies ya existente durante esta revisión.
- La paleta se comprueba automáticamente en antiguos umbrales y límite del ciclo. Pendiente para 1.0: revisión jugable completa de un ciclo día/noche y verificación en un dispositivo táctil real; pruebas del modelo no validan por sí solas la sensación de juego.
- GitHub remoto: repositorio público https://github.com/DavidOrtegaH/TuxFall creado; verificadas las cuatro ramas y `main` predeterminada. Pull requests restringidas a colaboradores, sin colaboradores externos añadidos. CI de `develop` completada correctamente: https://github.com/DavidOrtegaH/TuxFall/actions/runs/43421349340. No hay despliegue público del juego ni etiqueta estable.

## Revisión v3: ventana de juego

- Especificados R16–R19 antes de cambiar la presentación. La geometría del modelo y las colisiones se conservan; el canvas se ajusta con `object-fit: contain`, y el marco comparte el color del cielo.
- 14 pruebas correctas, build y comprobación sintáctica correctos. El build incluye el logo SVG local; el servidor de desarrollo lo entrega con `image/svg+xml`.
- Escritorio 1280×800: marco 440×760 centrado (x=420, y=20); récord debajo de Play y guía debajo del récord, sin scroll externo.
- Viewports 390×844 y 320×568: marco desde (0,0) ocupando todo el viewport, sin scroll externo ni desbordamiento horizontal del menú. El menú de inicio cabe completo a 320×568.
- Comprobados en navegador: inicio, reintento con récord y puntuación de la partida en ese orden, pausa y continuación. Consola sin errores. Guía seleccionada por capacidad de entrada y último uso de teclado/táctil, no por anchura; los viewports emulados siguen teniendo teclado/ratón. La comprobación física en teléfono/tablet continúa pendiente para la 1.0.
