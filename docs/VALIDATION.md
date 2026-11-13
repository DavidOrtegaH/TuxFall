# Validación de desarrollo 0.1.0

Fecha: 13 de noviembre de 2026. Esto no declara una versión estable ni sustituye la revisión de la futura 1.0.

- `npm test`: 14 pruebas correctas. Carriles, velocidad y aceleración, obstáculos, colisiones, puntuación, pausa, continuidad de paleta y cookies (consentimiento, rechazo, caducidad, revocación, bloqueo del navegador).
- `npm run build`: genera `dist` incluyendo política de cookies, licencia y avisos de autoría.
- `node --check src/main.js` y `node --check src/render.js`: correctos.
- Navegador local: comprobados inicio con Play, actualización del marcador, fin de partida con puntuación y reintento, y panel de configuración de cookies con opciones equivalentes. No se modificó una preferencia de cookies ya existente durante esta revisión.
- La paleta se comprueba automáticamente en antiguos umbrales y límite del ciclo. Pendiente para 1.0: revisión jugable completa de un ciclo día/noche y verificación en un dispositivo táctil real; pruebas del modelo no validan por sí solas la sensación de juego.
- GitHub remoto: repositorio público https://github.com/DavidOrtegaH/TuxFall creado; verificadas las cuatro ramas y `main` predeterminada. Pull requests restringidas a colaboradores, sin colaboradores externos añadidos. CI de `develop` completada correctamente: https://github.com/DavidOrtegaH/TuxFall/actions/runs/43421349340. No hay despliegue público del juego ni etiqueta estable.
