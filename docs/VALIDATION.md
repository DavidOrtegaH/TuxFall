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

## Revisión v4: dificultad, contraste y conservación del récord

24 pruebas correctas, build y comprobaciones sintácticas correctos. Consola del navegador sin errores durante la revisión.

- Mantiene 260 px/s y 320 px/s al acelerar; oleadas progresan de 1.8 a 1.0 s en 75 s. Margen mínimo de un avión completo: `(520 - 18 - 174 - 31) / 320 = 0.928125 s`.
- Simulación reproducible: 12 semillas × 3 patrones de aceleración × 8 minutos, con respuesta de 300 ms y 150 ms entre movimientos consecutivos. Todas sobreviven. Verifica que esos controles y márgenes permiten esquivar; no demuestra una experiencia desafiante para todas las personas. El ajuste humano y en teléfono/tablet real sigue pendiente para 1.0.
- Contraste de contornos probado en los 256 tonos grises y en 6 001 instantes del ciclo; al menos un contorno >=3:1. Opacidad de contornos comprobada en día, crepúsculo y noche. Revisadas visualmente doce escenas con ambos obstáculos, paracaídas, cuerdas y líneas direccionales en `tests/visual-qa.html` (excluido del build).
- Favicon SVG inspeccionado con Tux y paracaídas; cuerpo compartido con el sprite jugable. Se regenera durante cada build y se referencia desde juego y política de cookies.
- Persistencia v2 probada: no leer/escribir récord sin nuevo consentimiento, migrar la cookie anterior solo al aceptar, conservar el récord local sin caducidad de aplicación, renovar cookies dentro del máximo de 400 días y mantener fija la decisión de 720 días. Rechazo/revocación elimina las dos copias, incluso con otra pestaña abierta. Probados fallos de cookies/localStorage y recuperación tras renovar el permiso años después.
- Navegador local: se pidió la nueva decisión, se recuperó el récord anterior al aceptar y se conservó después de recargar. Cambiar duración no convirtió automáticamente la aceptación antigua en un consentimiento nuevo.

## Revisión v5: desafío e idiomas

30 pruebas correctas, build y comprobaciones sintácticas correctos. Consola del navegador sin errores de la aplicación.

- Nuevos máximos: 340 px/s, 430 al acelerar; filas cada 0.74 s al completar la progresión. Filas de dos pájaros, huecos variables y al menos una vía libre, manteniendo la prohibición de aviones consecutivos. Avión completo visible `(520 - 18 - 174 - 31) / 430 ≈ 0.69 s` antes de colisionar.
- Simulación de 72 combinaciones (12 semillas × 3 patrones de aceleración × 2 tasas: 30/120 FPS), ocho minutos cada una, con 220 ms de respuesta y 110 ms entre cambios: todas esquivan sin colisión. No es una validación con personas ni garantiza que todos encuentren el mismo desafío.
- Traducciones con claves y variables equivalentes; verificados los metadatos y claves de las tres páginas de producto. Español por defecto sin crear cookie; elección expresa persistente, recuperación por cookie o almacenamiento local, funcionamiento con almacenamiento bloqueado e independencia del permiso del récord.
- Navegador: título `TuxFall`; menús sans serif y guía a 14 px. Cambio ES→EN, persistencia tras recargar, diálogo de cookies, fin de partida y páginas de privacidad/créditos en inglés; cambio desde otra página actualiza el menú abierto. Selector operable con flechas de teclado. Cambio de idioma durante pausa conserva la partida y actualiza etiquetas de reanudar. La revisión terminó en español, conservando el récord anterior.
- Viewport 320×568: marco completo desde (0,0), sin scroll externo ni desbordamiento horizontal del menú; texto de controles de 14 px. El scroll interno permite conservar la legibilidad cuando no cabe todo.
- Verificados `html.lang` y `translate="no"` con las instrucciones `notranslate`. Son indicaciones al navegador, no un bloqueo de traducción manual o extensiones.

## Revisión v6: banderas de idioma

- Selector compartido con banderas SVG monocromas de España y Reino Unido, sin emojis. En el menú de juego aparece debajo de la guía y antes de los enlaces, reutilizando la visibilidad de inicio/pausa/fin.
- Navegador: posición debajo de los controles confirmada por geometría; botones de 50 px de alto. Selección identificada mediante borde, subrayado y `aria-pressed`. Cambio a inglés, persistencia tras recargar y vuelta a español con Espacio comprobados; récord conservado y consola sin errores.
- Las 30 pruebas existentes pasan y el build se genera correctamente. No cambian las reglas del juego ni el formato de la preferencia persistente.

## Revisión v7: etiquetas y explicación de renovación

- Menú inicial muestra «Jugar»; pausa «Pausa» y fin «Reintentar», con equivalentes ingleses. Medido en navegador: 36 px entre logo y etiqueta, 8 px entre etiqueta y botón. Aviso de récord separado de la etiqueta del botón.
- Un único enlace «Créditos y Licencia». Retirados los párrafos solicitados de créditos y privacidad en ambos idiomas; se conservan atribución de Tux, LICENSE y NOTICE originales.
- «Configurar cookies» distingue la fecha móvil de la cookie (hasta 400 días desde la visita/guardado), el permiso de 720 días no renovado automáticamente y la copia local sin caducidad de aplicación. Informa de nuevo permiso para continuar y posible borrado anticipado; no promete conservación perpetua. Idioma explicado como preferencia independiente.
- Persistencia sin cambios de código ni pérdida del récord. Se mantienen las pruebas de renovación, caducidad, reaceptación y recuperación.

## Revisión v8: jerarquía del HUD y centrado

- Etiquetas a 12 px en sans serif, peso 600 y color secundario; números conservan 19 px y peso 700. Marcador dentro de su altura de 64 px, sin entrar en el canvas.
- Iconos SVG compartidos para Play, pausa y reintento, incluido reanudar en el HUD. Eliminado padding que hacía exceder el SVG de 38 px en el botón compacto de 58 px.
- Navegador: centros del dibujo y SVG de Play coinciden con el botón (desviación x/y = 0 px). Pausa y reintento también dan 0 px en ambos ejes. Verificado además un viewport de 320×568 mediante un marco temporal: botón de 58×58 e icono centrado a 0 px. Marco de QA eliminado tras comprobarlo.
- Las 30 pruebas pasan, comprobación sintáctica y build correctos. Conservados nombres accesibles, traducciones y lógica de juego.

## Revisión v9: felicitación y efectos de sonido

- «NUEVO RÉCORD» sustituye «TU RÉCORD» al superar una marca previa positiva, con tres Tux pixelados a modo de exclamación y equivalentes ingleses. Se conserva la puntuación de la partida debajo.
- Tres sonidos sintetizados con Web Audio: cambio efectivo de carril, récord una vez por partida e hitos de 1000 puntos. Si coinciden récord e hito, el segundo se retrasa para distinguirlos. Sin descargas, dependencias ni nuevas cookies.
- Audio activado al iniciar mediante gesto; silencio conservado entre reintentos durante la visita. Pausa, pérdida de foco y silencio cancelan notas activas y pendientes. Sin Web Audio el juego funciona y el control indica indisponibilidad.
- 33 pruebas y build correctos. Nuevas pruebas comprueban umbrales estrictos, hitos sin repetición, programación de notas distintas, audio diferido, cancelación y fallo seguro.
- Navegador: botón de sonido de 48×48 a 12 px de pausa, cambio de etiqueta/icono al silenciar y consola sin errores. El récord de prueba se aísla del almacenamiento del usuario.
- Flecha de reintento con extremo abierto y hueco visible respecto al final del arco.
- Revisión visual aislada: fin de partida con NUEVO RÉCORD y exactamente tres Tux; al reintentar desaparecen y vuelve TU RÉCORD. Conservados los 1761 puntos existentes del usuario; archivos temporales retirados.

## Revisión v10: sonido persistente y felicitación compacta

- Rótulo NUEVO RÉCORD flanqueado por un Tux a cada lado, con el sprite y colores del juego.
- Silencio por defecto sin escribir cookie. Elección expresa on/off guardada en tuxfall_sound, limitada a ruta/host, SameSite=Lax y Secure bajo HTTPS; 400 días renovables. No depende del guardado del récord. Política y diálogo actualizados en español e inglés.
- Cambio de carril: tono triangular deslizante de 95 ms; hito: dos notas ascendentes de 220 ms separadas 130 ms. Ganancia principal aumentada de 0.045 a 0.22. Activar el sonido reproduce una confirmación.
- 36 pruebas correctas, incluidos silencio inicial, cookies on/off, recarga, cookies bloqueadas, cancelación y umbrales. Medición en Web Audio real tras gesto: pico 0.173 para carril y 0.185 para hito, contexto running. Esto verifica generación de señal; no permite confirmar el volumen físico de los altavoces del usuario.
- Navegador: verificados estado inicial silenciado y persistencia de activación y silencio tras recarga. Prueba de récord aislada sin modificar el récord real.
- Cookie funcional de personalización solicitada expresamente, sin publicidad ni perfiles; criterio consultado en https://www.aepd.es/guias/guia-cookies.pdf.
