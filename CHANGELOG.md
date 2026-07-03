# Changelog

All notable changes to this project are documented in this file.

This project follows Semantic Versioning.

The repository currently targets `0.1.0` as its initial release baseline while
the project remains experimental.

Keep all pending changes under `[Unreleased]` until a deliberate
release-preparation step moves them into a numbered version section.

Every release must use a Git tag in the format `vMAJOR.MINOR.PATCH`.

Do not publish a public or stable release until the remaining security,
documentation, and repository-baseline blockers are resolved.

## [Unreleased]

## [0.1.0] - 2026-07-03

### Added

* Added the baseline GRS repository files for documentation, security,
  licensing, editor consistency, and release history.
* Added sanitized repository-managed screenshots for the home page, settings
  page, and safe map fallback state under `assets/screenshots/`.

### Changed

* Expanded `README.md` with GRS-compliant project, setup, configuration,
  manual QA, and release-status guidance for PlaceKeeper.
* Documented the local setup and configuration workflow, and added lightweight
  Node-based static-server tooling for reproducible local runs.
* Added a lightweight validation workflow with automated Node checks, a
  committed-key safety scan, and documented manual QA guidance.
* Added a minimal GitHub Actions workflow that runs the existing automated
  validation bundle on `main` pushes and pull requests.
* Updated `README.md` to embed the new screenshots and explain the safe
  missing-key map screenshot state.
* Updated the repository documentation to reflect the live GitHub Pages demo
  and the safe deployed missing-key fallback behavior for `map.html`.
* Redacted detected secret values from the committed-key validation output so
  failures report only file location and reason.
* Moved repository-managed screenshots to `assets/screenshots/` to align the
  media layout with GRS.