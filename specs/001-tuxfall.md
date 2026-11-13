# TuxFall · especificación v1

Estado: implementable. SpecDD: requisitos → modelo comprobable → interfaz → validación.

## Revisión v2
- R9: mantener ↓/S o botón táctil acelera ×1.5 hasta 320 px/s. Soltar, cancelar contacto, pausar o perder foco elimina el impulso; no cambia la dificultad permanente. Puntos según distancia real.
- R10: HUD fijo superior derecho fuera de la pista; puntuación y récord en directo. Inicio/reanudación con Play, fin con icono circular de reintento y puntuación; nombres accesibles.
- R11: interpolación continua de fondo y tinta sin umbrales; contorno doble para obstáculos y fundido de sol/luna. Sustituye R5.
- R12: aviso visual y accesible una vez por partida al superar un récord previo positivo. Primera partida establece récord al acabar.
- R13: `tuxfall_best` opcional, solo con consentimiento explícito. `tuxfall_consent` técnica recuerda decisión 180 días sin renovación automática. Récord expira junto con consentimiento. Rechazar permite jugar con récord en memoria; enlace permanente permite revocar y borrar. Política informa finalidad, duración, proveedor y alcance. Eliminar almacenamiento local antiguo sin migrar. Fallos de cookies no bloquean juego. Sustituye persistencia de R4.

El máximo manual de R9 amplía R2 y conserva más de un segundo de anticipación.

## Distribución y mantenimiento
- R14: proyecto personal de David Ortega Hoyas, con código público bajo PolyForm Noncommercial 1.0.0 y Required Notice de autoría, preservando derechos de terceros. No se aceptan contribuciones externas. No anunciar como open source OSI.
- R15: `main` principal; `features` desarrollo; `develop` integración; `release` estabilización/publicación. Versión en desarrollo 0.1.0, sin etiqueta 1.0 hasta terminarla. CI en todas las ramas; despliegue manual desde `release`.

## Experiencia
Juego infinito monocromo, pixelado y vertical. Tux cae en paracaídas; el mundo asciende. No hay meta ni movimiento horizontal autónomo de obstáculos.

## Requisitos y aceptación
- R1: tres carriles; flechas/A/D o botones táctiles cambian exactamente un carril por pulsación, sin repetición al mantener. Cambio inmediato; alas impulsan hacia el lado contrario durante 160 ms. Nunca salir de los extremos.
- R2: velocidad inicial 95 px/s; aumenta 2.2 px/s por segundo hasta 260. Paracaídas entero hasta 25 s, rasgado hasta 50 s y destruido después. Los tres estados son distinguibles sin color.
- R3: pájaro ocupa un carril, avión dos contiguos. Probabilidad de avión 22%, nunca dos consecutivos. Oleadas separadas 1.65 s, siempre un carril libre; al máximo, más de un segundo para decidir desde su entrada hasta Tux.
- R4: colisión de cuerpos termina partida; cuerdas y tela no son hitbox. Puntuación entera según distancia, récord local persistente y aviso cada 100 puntos. Reiniciar restaura tiempo, posición y dificultad.
- R5: ciclo día/noche de 60 s con inversión gradual monocroma, nubes en varias capas y sol/luna en movimiento. Tux conserva vientre claro y contorno legible.
- R6: inicio explícito, pausa/reanudar (P/Escape o botón), reinicio, pausa automática al abandonar pestaña. Pausa detiene simulación, puntuación y ciclo.
- R7: diseño adaptable, botones accesibles, foco visible, instrucciones en español, sin red ni servicios externos para jugar. Almacenamiento bloqueado no impide jugar. Movimiento reducido elimina transiciones decorativas.
- R8: publicación estática compatible con subruta de GitHub Pages. Sin dependencias de producción ni seguimiento.

## Decisiones
JavaScript ES modules + Canvas 2D con resolución lógica 360×520. Node.js para servidor, build y pruebas nativas. Modelo separado de renderizado; timestep limitado y colisión barrida para evitar saltarse obstáculos. Sprites originales dibujados por código; atribución de Tux a Larry Ewing y GIMP.

## Verificación
Pruebas automáticas: R1 límites; R2 progresión y tope; R3 ocupación, frecuencia y separación; R4 colisión, puntuación, reinicio; R6 pausa. Revisión visual/manual: pixel art, impulso, inversión, móvil y teclado. Cambiar esta especificación antes de modificar comportamiento.
