# Changelog

All notable changes to this project are documented in this file.

This project follows Semantic Versioning.

## [Unreleased]

### Added

- Added the baseline GRS repository files for documentation, security,
  licensing, editor consistency, and release history.

### Changed

- Expanded `README.md` with GRS-compliant project, setup, configuration,
  manual QA, and release-status guidance for PlaceKeeper.
- Documented the local setup and configuration workflow, and added lightweight
  Node-based static-server tooling for reproducible local runs.
- Added a lightweight validation workflow with automated Node checks, a
  committed-key safety scan, and documented manual QA guidance.
- Added a minimal GitHub Actions workflow that runs the existing automated
  validation bundle on `main` pushes and pull requests.
