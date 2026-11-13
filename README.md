# TuxFall ↓

Juego web monocromo de caída libre con Tux. Tres carriles, pájaros, aviones, paracaídas degradable y ciclo día/noche.

La interfaz contiene solo el juego: marco centrado en PC y viewport completo en móvil/tablet. Los menús legibles incluyen logo pixelado, Play/reintento, récord, guía según teclado o entrada táctil y banderas monocromas de España / Reino Unido justo debajo de los controles para elegir idioma. Al terminar, la puntuación de la partida aparece debajo del récord. Cookies, licencia y créditos están disponibles dentro del menú y la pausa.

Repositorio oficial: https://github.com/DavidOrtegaH/TuxFall. **Jugar en Internet: https://davidortegah.github.io/TuxFall/**. El enlace del repositorio muestra el código; el enlace de GitHub Pages abre el juego.

Versión estable **1.0.0**, aprobada por David Ortega Hoyas. `main` es la principal; `features` desarrolla, `develop` integra y `release` publica.

## Ejecutar
Requiere Node.js 22 o superior. No necesita instalar paquetes.

```sh
npm run dev
```

Abrir http://127.0.0.1:5173. Flechas o A/D para cambiar de carril; mantener ↓/S para acelerar; espacio para iniciar; P/Escape para pausar. También hay botones táctiles. Tras aceptar, el récord se guarda localmente sin caducidad del juego y con cookie de respaldo renovable de hasta 400 días. Se renueva la decisión a los 720 días y se puede revocar desde «Configurar cookies». El navegador o el usuario pueden borrar datos; no se promete persistencia indefinida. Ver [política de cookies](https://github.com/DavidOrtegaH/TuxFall/blob/develop/cookies.html).

La velocidad llega a 340 px/s (430 manteniendo aceleración); las filas pasan progresivamente de 1.8 a 0.74 segundos. Aparecen filas de dos pájaros que dejan un solo hueco y favorecen cambiar de carril, sin perseguir al jugador. A la velocidad máxima, un avión completo conserva unos 0.69 s de margen visible antes de colisionar. Una simulación con respuesta de 220 ms y 110 ms entre cambios comprueba 72 combinaciones de semillas, aceleración y tasas de 30/120 FPS durante ocho minutos; verifica margen mecánico, no garantiza una dificultad adecuada para todas las personas.

El título es `TuxFall`. Español es el idioma predeterminado; la elección expresa de inglés o español se recuerda mediante la cookie funcional `tuxfall_language` (400 días renovables) y una copia local. Es independiente del guardado opcional del récord. El selector traduce interfaz, mensajes accesibles y páginas de privacidad/créditos/licencia, manteniendo intacto el texto jurídico original de LICENSE. `html[lang]` refleja el idioma visible; `translate="no"` y metadatos `notranslate` indican que no se desea traducción automática. La traducción manual, extensiones o ajustes del navegador quedan bajo control del usuario.

```sh
npm test
npm run build
```

## Stack y SpecDD
JavaScript ES modules, Canvas 2D y CSS; herramientas y pruebas nativas de Node. Sin framework, servicios, fuentes remotas ni dependencias de producción. Canvas mantiene el pixel art consistente y el modelo independiente permite verificar las reglas.

La fuente de comportamiento es [specs/001-tuxfall.md](https://github.com/DavidOrtegaH/TuxFall/blob/develop/specs/001-tuxfall.md). Flujo: actualizar requisitos y criterios → modificar modelo → verificar pruebas → renderizado y comprobación visual. Las pruebas citan los identificadores de requisito. No se requiere plataforma de SpecDD externa.

## GitHub Pages
El workflow prueba y construye las cuatro ramas y los PRs. Publica automáticamente los pushes de `release`, y también admite ejecución manual desde esa rama. `features`, `develop`, `main` y los PRs no despliegan directamente. Pages usa GitHub Actions como origen; el entorno solo admite `release`.

URL pública: https://davidortegah.github.io/TuxFall/. La versión publicada puede comprobarse en https://davidortegah.github.io/TuxFall/version.json. Recursos relativos y sitemap en la subruta. Para revisar el artefacto local: `npm run build` y `node scripts/serve.mjs --root dist --base /TuxFall/ --port 5174`.

La auditoría y sus límites están en [docs/AUDIT-2026-11-13.md](docs/AUDIT-2026-11-13.md). No se garantiza la indexación en buscadores. La imagen de enlaces compartidos se genera a partir del logo y sprites existentes, sin modificar el juego.

## Revisión manual
Comprobar: controles táctiles y teclado; pausa al cambiar de pestaña; aspecto del paracaídas a 0/25/50 segundos; ciclo completo de 60 segundos; cambio contiguo con líneas hacia la dirección elegida; récord al recargar; pantalla estrecha y preferencia de movimiento reducido. Las pruebas del modelo no reemplazan esta revisión visual. La página local `tests/visual-qa.html` muestra escenas de día, crepúsculo y noche con ambos obstáculos; no se incluye en el build público.

El favicon SVG utiliza el mismo sprite que Tux. Se puede regenerar con `npm run build:icon`; conserva los créditos de Tux y se copia al build junto a los recursos de `src`.

## Licencia, autoría y contribuciones
Copyright © 2026 David Ortega Hoyas sobre sus aportaciones originales. [PolyForm Noncommercial 1.0.0](LICENSE) permite los usos no comerciales y los demás fines que define expresamente. Exige conservar los avisos `Required Notice:` de [NOTICE.md](NOTICE.md), junto con la licencia o su URL. No permite explotar comercialmente el juego fuera de los fines autorizados. Incluye permisos específicos para determinadas organizaciones sin ánimo de lucro, educativas y públicas, con independencia de su financiación; el texto oficial es el que rige. No es una prohibición absoluta de todo movimiento de dinero en cualquier contexto.

El código es público y consultable, pero esta licencia no es «open source» según la [definición OSI](https://opensource.org/osd), que exige permitir también uso comercial. No se concede exclusividad sobre la idea del juego ni sobre Tux. La licencia obliga a preservar atribución, pero no puede impedir técnicamente que alguien incumpla o cree un fork.

No se aceptan contribuciones externas: [CONTRIBUTING.md](CONTRIBUTING.md). Solo el propietario integra cambios. Flujo `features` → `develop` → `release` → `main`: [convenciones de Git](docs/BRANCHING.md). Versión estable `1.0.0`, aprobada por el propietario.

El sonido sintetizado acompaña los cambios de carril, los nuevos récords y cada 500 puntos. Silenciado por defecto, el botón de altavoz junto a pausa recuerda tu elección expresa con la cookie funcional tuxfall_sound (hasta 400 días renovables), independiente del permiso del récord. Al superar una marca previa, el menú final muestra un Tux a cada lado de NUEVO RÉCORD.
 Al alcanzar cada 500 puntos o superar un récord previo positivo, el marcador se detiene visualmente y parpadea durante 1.2 segundos mientras la cuenta real continúa. Con movimiento reducido se omite el parpadeo.
