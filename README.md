# TuxFall ↓

Juego web monocromo de caída libre con Tux. Tres carriles, pájaros, aviones, paracaídas degradable y ciclo día/noche.

La interfaz contiene solo el juego: marco centrado en PC y viewport completo en móvil/tablet. Los menús incluyen logo pixelado, Play/reintento, récord y guía según teclado o entrada táctil. Al terminar, la puntuación de la partida aparece debajo del récord. Cookies, licencia y créditos están disponibles dentro del menú y la pausa.

Repositorio oficial: https://github.com/DavidOrtegaH/TuxFall. `main` es la rama principal y contiene por ahora la base legal y las normas. El prototipo `0.1.0` está en [`features`](https://github.com/DavidOrtegaH/TuxFall/tree/features) y su integración en [`develop`](https://github.com/DavidOrtegaH/TuxFall/tree/develop). Para ejecutarlo, usar una de esas ramas. `release` queda preparada para estabilizar versiones; todavía no hay una entrega 1.0 ni despliegue público del juego.

## Ejecutar
Requiere Node.js 22 o superior. No necesita instalar paquetes.

```sh
npm run dev
```

Abrir http://127.0.0.1:5173. Flechas o A/D para cambiar de carril; mantener ↓/S para acelerar; espacio para iniciar; P/Escape para pausar. También hay botones táctiles. Tras aceptar, el récord se guarda localmente sin caducidad del juego y con cookie de respaldo renovable de hasta 400 días. Se renueva la decisión a los 720 días y se puede revocar desde «Configurar cookies». El navegador o el usuario pueden borrar datos; no se promete persistencia indefinida. Ver [política de cookies](https://github.com/DavidOrtegaH/TuxFall/blob/develop/cookies.html).

La velocidad llega a 260 px/s (320 manteniendo aceleración); las oleadas pasan progresivamente de 1.8 a 1.0 segundos. A la velocidad máxima, un avión completo conserva unos 0.93 s de margen visible antes de colisionar. Una simulación con respuesta de 300 ms y 150 ms entre cambios comprueba 36 combinaciones durante ocho minutos; esto verifica margen mecánico, no garantiza una dificultad adecuada para todas las personas.

```sh
npm test
npm run build
```

## Stack y SpecDD
JavaScript ES modules, Canvas 2D y CSS; herramientas y pruebas nativas de Node. Sin framework, servicios, fuentes remotas ni dependencias de producción. Canvas mantiene el pixel art consistente y el modelo independiente permite verificar las reglas.

La fuente de comportamiento es [specs/001-tuxfall.md](https://github.com/DavidOrtegaH/TuxFall/blob/develop/specs/001-tuxfall.md). Flujo: actualizar requisitos y criterios → modificar modelo → verificar pruebas → renderizado y comprobación visual. Las pruebas citan los identificadores de requisito. No se requiere plataforma de SpecDD externa.

## GitHub Pages
El workflow del prototipo prueba y construye en las cuatro ramas y en PRs; despliega `dist` exclusivamente mediante ejecución manual desde `release`, una vez que esa rama reciba una versión finalizada con el workflow. Las cuatro ramas ya existen en GitHub y la predeterminada es `main`. Para el primer despliegue, en Settings → Pages → Build and deployment, seleccionar GitHub Actions. GitHub Pages admite repositorios públicos con GitHub Free: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

Todas las rutas de recursos son relativas para funcionar en `/TuxFall/`. El repositorio está creado y sincronizado. Pages sigue sin publicar: se habilitará cuando exista una versión estable lista para desplegar.

## Revisión manual
Comprobar: controles táctiles y teclado; pausa al cambiar de pestaña; aspecto del paracaídas a 0/25/50 segundos; ciclo completo de 60 segundos; cambio contiguo con líneas hacia la dirección elegida; récord al recargar; pantalla estrecha y preferencia de movimiento reducido. Las pruebas del modelo no reemplazan esta revisión visual. La página local `tests/visual-qa.html` muestra escenas de día, crepúsculo y noche con ambos obstáculos; no se incluye en el build público.

El favicon SVG utiliza el mismo sprite que Tux. Se puede regenerar con `npm run build:icon`; conserva los créditos de Tux y se copia al build junto a los recursos de `src`.

## Licencia, autoría y contribuciones
Copyright © 2026 David Ortega Hoyas sobre sus aportaciones originales. [PolyForm Noncommercial 1.0.0](LICENSE) permite los usos no comerciales y los demás fines que define expresamente. Exige conservar los avisos `Required Notice:` de [NOTICE.md](NOTICE.md), junto con la licencia o su URL. No permite explotar comercialmente el juego fuera de los fines autorizados. Incluye permisos específicos para determinadas organizaciones sin ánimo de lucro, educativas y públicas, con independencia de su financiación; el texto oficial es el que rige. No es una prohibición absoluta de todo movimiento de dinero en cualquier contexto.

El código es público y consultable, pero esta licencia no es «open source» según la [definición OSI](https://opensource.org/osd), que exige permitir también uso comercial. No se concede exclusividad sobre la idea del juego ni sobre Tux. La licencia obliga a preservar atribución, pero no puede impedir técnicamente que alguien incumpla o cree un fork.

No se aceptan contribuciones externas: [CONTRIBUTING.md](CONTRIBUTING.md). Solo el propietario integra cambios. Flujo `features` → `develop` → `release` → `main`: [convenciones de Git](docs/BRANCHING.md). Versión en desarrollo `0.1.0`; 1.0 se publicará cuando esté finalizada.
