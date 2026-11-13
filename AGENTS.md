# Project instructions

- Follow SpecDD: update `specs/001-tuxfall.md` before changing behavior; verify the relevant acceptance criteria.
- Use Conventional Commits in English for every commit, including merge commits (for example `feat: add manual descent acceleration`).
- `main` is the default principal branch, `features` is for development, `develop` is for integration, and `release` is for stabilization and finished versions. Follow `docs/BRANCHING.md`.
- Work on `features`; integrate verified work into `develop`. Do not label or release 1.0 until it is finished and approved.
- The project is maintained exclusively by David Ortega Hoyas. Do not accept external contributions; follow `CONTRIBUTING.md`.
- Preserve the PolyForm Noncommercial license, Required Notice attribution, and third-party Tux credits. Describe the project as source-available/noncommercial, not OSI open source.
- Keep the game buildless and dependency-free in production. Verify changes with `npm test` and `npm run build` when appropriate.
