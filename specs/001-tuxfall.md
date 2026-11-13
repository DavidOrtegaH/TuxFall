# TuxFall · especificación v1

Estado: implementable. SpecDD: requisitos → modelo comprobable → interfaz → validación.

## Revisión v2
- R9: mantener ↓/S o botón táctil acelera ×1.5 hasta 320 px/s. Soltar, cancelar contacto, pausar o perder foco elimina el impulso; no cambia la dificultad permanente. Puntos según distancia real.
- R10: HUD fijo superior derecho fuera de la pista; puntuación y récord en directo. Inicio/reanudación con Play, fin con icono circular de reintento y puntuación; nombres accesibles.
- R11: interpolación continua de fondo y tinta sin umbrales; contorno doble para obstáculos y fundido de sol/luna. Sustituye R5.
- R12: aviso visual y accesible una vez por partida al superar un récord previo positivo. Primera partida establece récord al acabar.
- R13: `tuxfall_best` opcional, solo con consentimiento explícito. `tuxfall_consent` técnica recuerda decisión 180 días sin renovación automática. Récord expira junto con consentimiento. Rechazar permite jugar con récord en memoria; enlace permanente permite revocar y borrar. Política informa finalidad, duración, proveedor y alcance. Eliminar almacenamiento local antiguo sin migrar. Fallos de cookies no bloquean juego. Sustituye persistencia de R4.

El máximo manual de R9 amplía R2 y conserva más de un segundo de anticipación.

## Revisión v3 · foco en el juego
- R16: la página contiene únicamente el marco de juego. En móvil/tablet táctil ocupa el viewport disponible (`100dvh`, con safe areas); en PC se centra horizontal y verticalmente, ajustándose a la altura sin scroll de página. El canvas conserva píxeles cuadrados y la misma geometría de colisiones. El fondo de cualquier espacio de ajuste sigue el cielo.
- R17: inicio y fin muestran, en este orden, logo pixelado TuxFall, botón Play/reintento, récord actual y guía de controles. Al terminar se añade la puntuación de esa partida debajo del récord. Pausa usa la misma presentación con Play para continuar. Los valores coinciden con el HUD y se actualizan al reiniciar/superar récord.
- R18: guía de teclado en PC (←/→ o A/D, mantener ↓/S, P/Esc, espacio); guía táctil en móvil/tablet (botones laterales, mantener ↓ y botón de pausa). Detectar capacidad de entrada y actualizar al usar teclado/táctil, sin inferir dispositivo solo por anchura. Controles táctiles de al menos 48 px, fuera del canvas y visibles durante partida/pausa en modo táctil.
- R19: HUD superior derecho dentro del marco y fuera del canvas solo durante partida/pausa, sin tapar Tux u obstáculos. Sustituye la posición externa de R10. Eliminar presentación, cabecera y pie externos. Mantener cookies, licencia, autoría y créditos accesibles dentro del menú; consentimiento opcional sin impedir jugar y revocación desde la pausa.

Verificación de v3: revisión de inicio, fin y pausa en escritorio y viewport estrecho; comprobar orden de datos, ausencia de scroll horizontal/vertical externo y canvas sin distorsión. Mantener pruebas de reglas y build. No declarar 1.0.

## Revisión v4 · dificultad, visibilidad y persistencia
- R20: mantener límites de 260 px/s y 320 px/s con aceleración voluntaria. Aumentar el desafío reduciendo el intervalo de oleadas de 1.8 a 1.0 s durante los primeros 75 s; después permanece estable. Un avión completamente visible conserva al menos 0.9 s antes de entrar en la hitbox a velocidad máxima. Validar una simulación con respuesta de 300 ms y 150 ms entre cambios consecutivos, varias semillas y aceleración intermitente. Es una garantía de margen mecánico, no una prueba de dificultad humana universal.
- R21: pájaros y aviones siempre opacos, con contorno exterior oscuro de 3 px y contorno interior claro de 1 px. En cualquier luminosidad del fondo, al menos uno conserva contraste >=3:1. La inversión de la tinta no elimina los contornos. Aplicar el mismo principio al paracaídas y las cuerdas para no confundir su estado con la iluminación. Verificar ciclo completo y muestras visuales diurnas/nocturnas/crepúsculo con ambos obstáculos.
- R22: sustituir el impulso de alas de R1 por tres líneas cortas y sutiles hacia el carril elegido durante 160 ms, sin animar las alas ni retrasar el cambio de carril. Reducir su opacidad hasta desaparecer; respetar movimiento reducido.
- R23: sustituir la persistencia de R13 por guardado opcional del récord sin caducidad de aplicación en `localStorage` (`tuxfall_record_v2`) y respaldo en cookie `tuxfall_best` de hasta 400 días, renovable en visitas/guardado mientras exista consentimiento válido. No prometer duración indefinida del navegador. La elección v2 se guarda en cookie técnica y `localStorage` durante 720 días, con fecha fija no renovada silenciosamente. Pedir de nuevo consentimiento al cambiar a esta política o caducar la elección. Sin consentimiento válido, no leer ni escribir el récord; al renovar explícitamente, recuperar el récord anterior. Rechazar/revocar elimina ambas copias del récord. Bloqueos o borrados del navegador no impiden jugar. Consentimiento y récord tienen duraciones independientes; actualizar todos los textos y la política.
- R24: favicon SVG local de Tux con paracaídas entero, con el mismo sprite que el personaje, legible en fondos claros/oscuros. Añadirlo a juego y política de cookies e incluirlo en el build, con atribución de Tux preservada.

Fuentes de R23: límite de cookies de Chrome (https://developer.chrome.com/blog/cookie-max-age-expires) y recomendación de consentimiento de la AEPD (https://www.aepd.es/guias/guia-cookies.pdf). Almacenamiento local tampoco garantiza retención si el navegador/usuario lo borra.

## Revisión v5 · desafío e idiomas
- R25 sustituye los límites de R2/R9 y R20: velocidad de 95 a 340 px/s (+3.4 por segundo), hasta 430 con aceleración voluntaria. Intervalo de filas de 1.8 a 0.74 s en 90 s. Introducir progresivamente filas de dos pájaros (cada uno ocupa un carril) y favorecer que el hueco cambie respecto al anterior, sin perseguir al jugador. Siempre al menos un carril libre por fila y nunca dos aviones consecutivos. Avión completo visible al menos 0.68 s antes de colisión al máximo. Simular rutas con 220 ms de reacción y 110 ms entre movimientos, varias semillas, aceleración cambiante y distintas tasas de frames. No convertir esta simulación en una promesa de facilidad humana universal.
- R26: título del juego exactamente `TuxFall`. Menús en fuente sans serif del sistema, texto de guía/acciones al menos 14 px, párrafos legales al menos 16 px y contraste alto; conservar logo y juego pixelados. En pantallas pequeñas permitir scroll interno del menú antes que reducir la tipografía.
- R27: selector Español / English en inicio, fin y pausa, y en las páginas auxiliares. Español por defecto, sin deducir el idioma del navegador. Cambia todos los textos de la interfaz, ayudas, estados, anuncios accesibles, metadatos y páginas de privacidad/créditos/licencia. Mantener nombres propios, códigos de cookies y el texto jurídico canónico de LICENSE sin alterarlo; ofrecer explicación bilingüe y enlazar al original inglés.
- R28: cookie funcional `tuxfall_language` de hasta 400 días renovables y respaldo local del idioma expresamente elegido. No crear preferencia por aplicar el español por defecto. Guardar al elegir y reutilizar al recargar o navegar a otra página, incluso si se rechaza guardar el récord. Usar exclusivamente para idioma; documentar duración y eliminación. Bloqueos del almacenamiento no impiden cambiar de idioma durante la visita.
- R29: `lang` del elemento `html` refleja el idioma mostrado. `translate="no"`, clase `notranslate`, meta `google` y `googlebot` con `notranslate` en todas las páginas de producto. No eliminar `lang` ni mentir sobre él. Son indicaciones para evitar sugerencias automáticas; el navegador, extensiones o traducción manual siguen bajo control del usuario.

## Revisión v6 · selector de banderas
- R30: sustituir el desplegable por botones con banderas SVG monocromas de España y Reino Unido, sin emojis ni colores nacionales. En el juego aparecen justo debajo de la guía de controles y antes de los enlaces del menú, únicamente en inicio, pausa y fin. Usar los mismos botones en páginas auxiliares para coherencia visual. Conservar traducciones, `lang` y persistencia existentes.
- R31: selección perceptible mediante borde y marca inferior, además de `aria-pressed`; nombres accesibles y ayuda traducidos. Botones de al menos 48 px de alto, foco visible y activación nativa por teclado. Respetar la paleta clara/oscura del marco.

## Revisión v7 · etiquetas y claridad de cookies
- R32: etiqueta sobre el botón: «Jugar» al entrar, «Pausa» al pausar y «Reintentar» al terminar, con equivalentes ingleses. Más espacio desde el logo que hacia el botón (36 px frente a 8 px; compactar a 26/24 px frente a 8 en pantallas bajas). Mostrar el nuevo récord por separado, sin sustituir la etiqueta de reintento.
- R33: un único enlace «Créditos y Licencia» al documento común. Retirar en ambos idiomas el párrafo de no afiliación y recursos ajenos, incluido su enlace de avisos. Mantener autoría, crédito de Larry Ewing/GIMP, licencia y avisos originales distribuidos. Retirar de privacidad el párrafo sobre migración desde los 180 días, sin cambiar el comportamiento de persistencia.
- R34: «Configurar cookies» explica que renovar desplaza la fecha hasta 400 días desde la visita/guardado, limitada por el permiso de 720 días que no se prolonga por visitar. Al caducar el permiso se solicita otra aceptación; el récord local permanece sin caducidad del juego y se recupera al aceptar si sigue disponible. No garantizar conservación: navegador/usuario pueden borrar datos antes. Rechazar elimina las dos copias. Aplicar la misma claridad a ambos idiomas y a privacidad.

## Revisión v8 · marcador e iconos centrados
- R35: etiquetas del HUD en sans serif de sistema a 12 px, peso 600 y espaciado moderado. Números a 19 px y peso 700 conservan mayor tamaño y protagonismo. Sin aumentar la altura de 64 px ni invadir el canvas; comprobar español e inglés.
- R36: Play, pausa, reanudar y reintento usan SVG en un mismo encuadre simétrico. Centrar el dibujo y el SVG en el cuadrado; eliminar caracteres tipográficos de pausa y padding que provoque desbordamiento en tamaños compactos. Mantener nombres accesibles y tamaños de botón existentes.

## Revisión v9 · celebración y sonido
- R37: al terminar tras superar un récord previo positivo, sustituir «TU RÉCORD» por «NUEVO RÉCORD» y mostrar tres Tux pixelados con punto inferior, como tres signos de exclamación. Compartir el sprite jugable y la paleta; sin duplicar el rótulo ni alterar «Reintentar». Anuncios accesibles y traducción inglesa conservados.
- R38: sonidos breves sintetizados localmente: cambio efectivo de carril, nuevo récord (una vez por partida) y cada múltiplo de 1000 puntos alcanzado (una vez por umbral, no cada frame). Reintentar reinicia los umbrales; pausar/reanudar no. No sonar al intentar salir del borde ni al moverse con la partida detenida. Si coinciden récord y mil puntos, reproducir ambos en secuencia.
- R39: control de sonido de 48×48 a la derecha de pausa, con 12 px de separación. Altavoz monocromo sin línea al estar activo, con línea al silenciar; nombre, ayuda y estado accesibles en ambos idiomas. Sonido activo inicialmente, iniciado solo por un gesto del usuario; silencio conservado durante la visita/reintentos, sin añadir cookies. Silenciar o pausar cancela sonidos activos y pendientes. Si Web Audio no está disponible, seguir jugando sin errores.
- R40: abrir un hueco visible entre la punta de flecha de reintento y el otro extremo del arco, manteniendo el icono centrado.

## Revisión v10 · sonido persistente y felicitación compacta
- R41: al finalizar con récord, mostrar exactamente un Tux a cada lado del rótulo NUEVO RÉCORD, en la misma fila, sin Tux debajo de la cifra.
- R42: silencio por defecto. Guardar solo la elección expresa en la cookie funcional propia `tuxfall_sound` (`on`/`off`), hasta 400 días renovables, independiente del permiso del récord. Si las cookies están bloqueadas, mantener la elección durante la visita. Documentarla en ambos idiomas y en Configurar cookies.
- R43: cambio de carril con tono breve deslizante audible; cada 1000 puntos con campanilla ascendente diferenciada. Audio iniciado por gesto al activarlo o iniciar partida con preferencia activa; confirmación sonora al activarlo. Mantener cancelación al pausar/silenciar y no repetir hitos.

## Revisión v11 · foco y hitos de puntuación
- R44: durante la partida, capturar flechas antes de la navegación de interfaz, cancelar su acción predeterminada y devolver el foco al canvas al usarlas. No desplazar selección a botones, ni activar el altavoz mediante controles de juego. Mantener Tab y foco visible para navegar por los controles, y no interceptar el diálogo de cookies.
- R45: aviso sonoro una sola vez por múltiplo de 500 puntos (500, 1000, 1500…), sustituyendo el intervalo anterior de 1000. No repetir al pausar/reanudar; reiniciar los hitos con cada partida.

## Revisión v12 · marcador de hitos
- R46: al alcanzar cada múltiplo de 500 o superar por primera vez un récord previo positivo, fijar visualmente PUNTOS durante 1.2 segundos y parpadear tres veces (ciclos de 400 ms). Al acabar recuperar inmediatamente la puntuación real, que sigue avanzando sin alterar velocidad, colisiones, récord ni guardado. En hitos mostrar el múltiplo alcanzado; al superar récord, la puntuación que lo supera. Eventos coincidentes comparten un efecto; un nuevo evento durante el efecto lo sustituye. Solo afecta a los números de PUNTOS, no al rótulo ni al récord.
- R47: pausa, fin y reintento descartan el efecto y muestran cifras reales. Con movimiento reducido, conservar la detención temporal sin parpadeo. No activar por récord inicial cero. El efecto visual es independiente del sonido y no modifica los anuncios accesibles.

## Revisión v13 · récord del HUD
- R48: al superar por primera vez el récord previo positivo, también fijar y parpadear el número de RÉCORD del HUD durante 1.2 segundos y tres ciclos de 400 ms, sincronizado con el efecto de PUNTOS. Mantener el cartel de nuevo récord. El récord real sigue actualizándose y guardándose; al finalizar el efecto se muestra su valor actual. Los hitos de 500 por sí solos no activan este efecto en RÉCORD. Pausa/fin lo descartan; movimiento reducido omite el parpadeo.

## Revisión v14 · auditoría y publicación
- R49: conservar estética, idiomas, controles y reglas. Añadir metadatos canónicos, descripción/social, datos estructurados veraces y sitemap para https://davidortegah.github.io/TuxFall/. No inventar reseñas ni garantizar indexación. No duplicar URLs por idioma sin páginas separadas.
- R50: CSP compatible con Canvas y Web Audio, sin scripts inline ejecutables, objetos, conexiones ni formularios externos; política de referrer. Publicar solo archivos necesarios, limpiar artefactos obsoletos y excluir pruebas, configuración y archivos ocultos. Documentar límites de cabeceras en Pages.
- R51: corregir accesibilidad de nombres del marcador, teclado en enlaces y foco al ocultar menús, sin quitar el foco de los controles operables. Mensaje bilingüe sin JavaScript y descripción accesible breve del juego sin cambiar la interfaz con JavaScript.
- R52: comprobar build real en subruta /TuxFall/, enlaces/recursos, teclado, viewport estrecho, contraste, privacidad y consola. CI con permisos mínimos, acciones fijadas y despliegue manual desde release. Publicación autorizada de 0.1.0 sin etiqueta 1.0, siguiendo features → develop → release → main.

## Revisión v15 · versión estable aprobada
- R53: David Ortega Hoyas aprueba expresamente la versión 1.0.0 el 13 de noviembre de 2026. Actualizar versión, documentación y etiqueta v1.0.0 sobre release tras verificarla; promover a main sin alterar aspecto ni reglas.
- R54: publicar automáticamente los cambios integrados en release, además de permitir despliegue manual; mantener las demás ramas y PR sin permisos de publicación. Identificar el artefacto mediante version.json y meta application-version, y comprobar la versión servida tras desplegar. No afirmar resuelto un fallo de acceso sin reproducirlo o contrastar sus síntomas.

## Revisión v16 · cookies sin alargar el menú (1.1.0)
- R55: el aviso inicial de cookies se presenta en diálogo modal fuera del flujo del menú. No añadir altura ni barra vertical a la ventana del juego por el aviso. Conservar texto, opciones Aceptar/Rechazar equivalentes y enlace legal. «Más tarde» o Escape cierran sin consentimiento ni guardado del récord. Configurar cookies mantiene su diálogo legible y desplazable. No ocultar barras para impedir leer contenido ni alterar controles, reglas o preferencias existentes.
- R56: el diálogo inicial se muestra solo cuando falta una decisión vigente. Mientras esté abierto, los atajos no inician ni mueven el juego. Tras aceptar/rechazar/cerrar, devolver el foco a Jugar. Versión 1.1.0 posterior a la etiqueta 1.0.0, con pruebas y publicación desde release.

## Revisión v17 · coherencia de caché (1.1.1)
- R57: tras reproducir en la web pública HTML 1.1.0 con un módulo i18n antiguo (Missing translation: es.later), generar recursos con nombres que incluyan una huella de contenido del build y reescribir tanto HTML como importaciones JS. Todos los módulos de un documento deben pertenecer al mismo build. Mantener versiones publicadas y etiquetas inmutables; corrección 1.1.1. Verificar dos builds con huellas distintas y sus enlaces, más recarga real en el navegador previamente afectado.

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
