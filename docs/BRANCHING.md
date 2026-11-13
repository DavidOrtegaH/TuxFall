# Ramas y versiones

| Rama | Finalidad |
| --- | --- |
| `main` | Rama principal y predeterminada. Conserva la base oficial y recibe las versiones aprobadas. |
| `develop` | Integración y comprobación de las funcionalidades. |
| `features` | Desarrollo activo antes de integrarlo en `develop`. |
| `release` | Preparación, correcciones finales y publicación de versiones estables. |

Flujo: `features` → `develop` → `release` → `main`. Después de estabilizar una versión, reintegrar las correcciones de `release`/`main` en `develop` y `features`. Los merges los realiza exclusivamente David Ortega Hoyas. Se usan exactamente estas cuatro ramas; no se crean prefijos `features/*` o `release/*` sin cambiar esta convención.

Todos los commits, incluidos los merges, siguen Conventional Commits en inglés: `feat: ...`, `fix: ...`, `docs: ...`, `chore: ...`. También se escriben en inglés los cuerpos de commit. La documentación y la interfaz pueden estar en español.

La versión pública inicial autorizada el 13 de noviembre de 2026 es `0.1.0`. No hay etiqueta `v1.0.0`; 1.0 exige finalización y aprobación expresa. El despliegue de Pages se ejecuta desde `release` manualmente, para no publicar desarrollo automáticamente.

La publicación de esta versión está autorizada en la tarea de auditoría y despliegue. Tras verificar `features`, se integra en `develop`, se promociona a `release` y después a `main`. Las cuatro ramas reciben la documentación de publicación; se deja el checkout en `features`.

CI ejecuta pruebas y build en las cuatro ramas. El repositorio oficial no acepta aportaciones externas; ver CONTRIBUTING.md. Las protecciones remotas, cuando estén disponibles, deben impedir borrados y force-push de `main`/`release`, limitar escrituras al propietario y mantener `main` como rama predeterminada. Estos ajustes no se activan por añadir este documento.
