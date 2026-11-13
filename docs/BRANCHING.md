# Ramas y versiones

| Rama | Finalidad |
| --- | --- |
| `main` | Rama principal y predeterminada. Conserva la base oficial y recibe las versiones aprobadas. |
| `develop` | Integración y comprobación de las funcionalidades. |
| `features` | Desarrollo activo antes de integrarlo en `develop`. |
| `release` | Preparación, correcciones finales y publicación de versiones estables. |

Flujo: `features` → `develop` → `release` → `main`. Después de estabilizar una versión, reintegrar las correcciones de `release`/`main` en `develop` y `features`. Los merges los realiza exclusivamente David Ortega Hoyas. Se usan exactamente estas cuatro ramas; no se crean prefijos `features/*` o `release/*` sin cambiar esta convención.

Todos los commits, incluidos los merges, siguen Conventional Commits en inglés: `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`. También se escriben en inglés los cuerpos de commit. La documentación y la interfaz pueden estar en español.

La versión 1.0.0 fue aprobada expresamente por David Ortega Hoyas. La versión 1.1.0 añade el aviso de cookies fuera del flujo del juego. Las etiquetas `v1.0.0` y `v1.1.0` identifican las respectivas versiones verificadas en `release` y promovidas a `main`.

Flujo autorizado: `features` → `develop` → `release` → `main`. Pages publica automáticamente cada push de `release`; también puede ejecutarse manualmente desde esa rama. El entorno `github-pages` permite únicamente `release`. Las otras ramas y los PRs solo ejecutan pruebas/build. Se deja el checkout en `features`.

CI ejecuta pruebas y build en las cuatro ramas. El repositorio oficial no acepta aportaciones externas; ver CONTRIBUTING.md. Las protecciones remotas, cuando estén disponibles, deben impedir borrados y force-push de `main`/`release`, limitar escrituras al propietario y mantener `main` como rama predeterminada. Estos ajustes no se activan por añadir este documento.
