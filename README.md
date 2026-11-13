# [Jugar a TuxFall](https://davidortegah.github.io/TuxFall/)

# TuxFall

TuxFall es un juego de caída libre con Tux, el pingüino de Linux, como protagonista. Tiene una estética monocroma y pixelada, tres carriles y una partida que se complica a medida que aumenta la velocidad. Hay que esquivar pájaros y aviones mientras el paracaídas se deteriora y el cielo pasa del día a la noche.

La idea parte de los juegos sencillos que puedes abrir y jugar en unos segundos, como el Dinosaurio de Google, pero con un recorrido vertical. En PC, la ventana de juego queda centrada; en móvil y tablet ocupa la pantalla. Está disponible en español e inglés, tiene sonido opcional y permite guardar el récord.

## Lo que he aprendido y las dificultades del proyecto

Con esta aplicación he aprendido a organizar un juego con JavaScript, módulos ES, Canvas y CSS, sin recurrir a un framework ni añadir dependencias de producción. Separar las reglas del juego del dibujo y de la interfaz me ha servido para probar las colisiones, la puntuación y los cambios de velocidad sin depender del navegador para cada comprobación.

Una de las partes que más ajustes necesitó fue la dificultad. Al principio, llegar a la velocidad máxima no suponía demasiado desafío. Fui ajustando la frecuencia y la distribución de los obstáculos, añadiendo filas con un único hueco libre y manteniendo una salida posible. Para comprobar los márgenes de reacción, incorporé simulaciones con distintas semillas, velocidades y tasas de fotogramas. Me sirvieron para detectar situaciones injustas, aunque no sustituyen las sensaciones de una partida real.

El ciclo de día y noche también dio problemas: una inversión demasiado brusca resultaba incómoda y algunos tonos podían hacer que los obstáculos se confundieran con el fondo. La solución fue suavizar la transición y usar contornos claros y oscuros que mantuvieran las siluetas visibles durante todo el ciclo.

Con los controles aprendí que no basta con escuchar las flechas del teclado. El foco podía quedarse en los botones y hacer que las teclas navegaran por la interfaz en lugar de controlar a Tux. Ajusté la captura de las teclas durante la partida y la devolución del foco al juego, conservando Tab para acceder a los botones. También adapté la guía y los controles a la entrada táctil.

El guardado del récord me llevó a distinguir entre cookies, almacenamiento local y consentimiento. Separé el guardado opcional de la puntuación de las preferencias de idioma y sonido, y contemplé el caso de que el navegador bloqueara el almacenamiento. El aviso inicial acabó en un diálogo independiente porque, dentro del menú, añadía altura y provocaba una barra de desplazamiento en la ventana del juego.

La publicación en GitHub Pages tuvo dos dificultades concretas. Primero, el entorno de despliegue solo permitía publicar desde main, mientras que el proyecto utiliza release para las versiones terminadas. Después apareció un fallo de caché: el navegador podía cargar el HTML nuevo con un módulo de traducciones antiguo e impedir el arranque. Ajusté la rama permitida y añadí una huella de contenido a los nombres de los recursos y a sus importaciones. Así, cada página carga los módulos de su mismo build.

También he aprendido a trabajar con SpecDD: dejar por escrito el comportamiento esperado antes de modificarlo y comprobar después sus criterios de aceptación. Mantener las ramas de desarrollo, integración y publicación separadas me ha ayudado a ordenar los cambios y conservar las versiones anteriores.

El resultado es un juego que se puede abrir desde un enlace, jugar con teclado o controles táctiles y usar sin aceptar el guardado del récord. He conseguido mantener una interfaz centrada en la partida, con dificultad progresiva, preferencias de idioma y sonido, marcadores animados y un despliegue que comprueba la versión publicada.

## Controles

| Acción | Teclado | Móvil y tablet |
| --- | --- | --- |
| Cambiar de carril | ← / → o A / D | Botones de izquierda y derecha |
| Acelerar | Mantener ↓ o S | Mantener el botón ↓ |
| Pausar o reanudar | P, Escape o botón de pausa | Botón de pausa |
| Iniciar o reintentar | Espacio o botón de juego | Botón de juego |
| Activar o silenciar el sonido | Botón de altavoz | Botón de altavoz |

Los cambios de carril son inmediatos y solo permiten pasar al carril contiguo. Los pájaros ocupan un carril y los aviones dos. La velocidad aumenta hasta un límite y se puede acelerar de forma voluntaria.

Cada 500 puntos y al superar un récord anterior, el marcador se detiene visualmente y parpadea unos instantes; la cuenta real sigue avanzando. Si está activada la preferencia de movimiento reducido, se omite el parpadeo.

## Ejecutar el proyecto

Requiere Node.js 22 o superior. No hace falta instalar paquetes.

```sh
npm run dev
```

Abrir [http://127.0.0.1:5173](http://127.0.0.1:5173).

```sh
npm test
npm run build
```

El build genera la carpeta `dist`. Para probarla con la misma subruta que GitHub Pages:

```sh
node scripts/serve.mjs --root dist --base /TuxFall/ --port 5174
```

Abrir [http://127.0.0.1:5174/TuxFall/](http://127.0.0.1:5174/TuxFall/).

## Preferencias y privacidad

El sonido está desactivado por defecto. La elección de sonido y de idioma se recuerda mediante preferencias funcionales, independientes del permiso para guardar el récord.

El récord solo se guarda de forma persistente si se acepta. Se puede rechazar, decidir más tarde o cambiar la decisión desde «Configurar cookies». El almacenamiento local del récord no tiene caducidad impuesta por el juego; la cookie de respaldo dura hasta 400 días renovables, sin superar los 720 días del consentimiento. El usuario o el navegador pueden borrar esos datos antes.

No hay cuentas, publicidad, analítica ni clasificación en un servidor. Más información en la [política de cookies](https://davidortegah.github.io/TuxFall/cookies.html).

## Organización y publicación

- `features`: desarrollo de cambios.
- `develop`: integración y comprobación.
- `release`: preparación y publicación de versiones.
- `main`: rama principal con la versión estable.

El flujo es `features` → `develop` → `release` → `main`. Los commits siguen Conventional Commits en inglés. GitHub Actions ejecuta las pruebas y el build; los cambios de `release` se publican automáticamente en GitHub Pages. También se puede lanzar el despliegue manualmente desde esa rama.

La versión estable actual es **1.1.1**. Las versiones anteriores se conservan en [Releases](https://github.com/DavidOrtegaH/TuxFall/releases), y la versión servida se puede consultar en [version.json](https://davidortegah.github.io/TuxFall/version.json).

La especificación está en [specs/001-tuxfall.md](specs/001-tuxfall.md), las comprobaciones en [docs/VALIDATION.md](docs/VALIDATION.md) y las convenciones de ramas en [docs/BRANCHING.md](docs/BRANCHING.md). La [auditoría previa a la publicación](docs/AUDIT-2026-11-13.md) recoge las revisiones de seguridad, SEO, accesibilidad y sus limitaciones.

## Licencia y créditos

Copyright © 2026 David Ortega Hoyas sobre sus aportaciones originales. El proyecto se distribuye bajo [PolyForm Noncommercial 1.0.0](LICENSE): el código es público y permite los usos no comerciales y los demás fines definidos en la licencia. No es una licencia de código abierto según la definición de la OSI.

Tux fue creado por Larry Ewing con GIMP. Las atribuciones y los avisos que deben conservarse están en [NOTICE.md](NOTICE.md). La licencia no concede exclusividad sobre Tux ni sobre la idea del juego.

El proyecto lo mantiene exclusivamente David Ortega Hoyas y no acepta contribuciones externas. Consulta [CONTRIBUTING.md](CONTRIBUTING.md) y [SECURITY.md](SECURITY.md).
