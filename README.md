# PlaceKeeper

## Project Title And Status

PlaceKeeper is a Coding Academy browser exercise for saving favorite places and
revisiting them on a Google Map.

- Repository type: Coding Academy
- Repository state: Experimental
- Release status: Not release-ready yet; the project should be treated as
  experimental until the remaining repository and product blockers are resolved

## Overview

PlaceKeeper is a small static web app built with plain HTML, CSS, and
JavaScript. It lets a user keep a lightweight personal places list, store that
data in the browser, and jump between saved places on a Google Map.

The current project is intentionally simple:

- no backend service
- no package manager or build pipeline
- no automated test suite
- browser persistence through `localStorage`

## Features

- Home page with quick navigation to settings and the map view
- Settings page for saving user preferences such as colors, age, date of birth,
  and birth time
- Map page with Google Maps integration for viewing and creating saved places
- Place management actions for adding, listing, focusing, and deleting places
- CSV export for the saved places list
- Local persistence for both places and user preferences

## Screenshots Or Demo

No repository-managed screenshots are included yet.

When screenshots are added, place them in a repository-owned documentation
location such as `docs/screenshots/` and link them from this section.

If a hosted demo is published later, add the public URL here together with a
note that the Google Maps configuration requirements still apply.

## Quick Start

1. Clone the repository.
2. Copy `js/maps-config.example.js` to `js/maps-config.js`.
3. Replace `YOUR_GOOGLE_MAPS_API_KEY` with a restricted Google Maps browser
   key.
4. Start a local static server from the repository root, for example:

   ```sh
   python -m http.server 8000
   ```

5. Open `http://localhost:8000/index.html` in a browser.

You can also open `index.html` directly from the filesystem for basic flows,
but a local static server is the safer default for manual QA and future asset
loading changes.

## Configuration

The map experience depends on the Google Maps JavaScript API.

- Local configuration file: `js/maps-config.js`
- Tracked template: `js/maps-config.example.js`
- Global key contract: `window.PLACEKEEPER_MAPS_API_KEY`
- Git policy: `js/maps-config.js` must stay untracked because it can contain a
  local API key

Recommended setup:

1. Create a browser key in Google Cloud.
2. Restrict the key to the Google Maps JavaScript API.
3. Add HTTP referrer restrictions for the local and deployed origins that are
   allowed to use the key.
4. Keep production or unrestricted keys out of this repository.

If the key is missing or still set to the placeholder value, `map.html` shows a
configuration message instead of loading Google Maps.

For more detail, see [docs/maps-configuration.md](docs/maps-configuration.md).

## Project Structure

```text
.
|-- css/
|   `-- main.css
|-- docs/
|   `-- maps-configuration.md
|-- js/
|   |-- maps-config.example.js
|   |-- map.controller.js
|   |-- main.controller.js
|   |-- placeService.js
|   |-- user-prefs.controller.js
|   |-- userService.js
|   `-- utilService.js
|-- index.html
|-- map.html
`-- user-prefs.html
```

## Development Notes

- The app uses plain browser globals and script tags rather than modules or a
  bundler.
- User preferences are stored under the `userPrefsDB` local storage key.
- Saved places are stored under the `placeDB` local storage key.
- Initial sample places are seeded when no places exist in local storage.
- The map page loads the Google Maps script dynamically after validating the
  configured API key.

## Manual QA

There is no automated test suite in the current experimental state, so
validation is manual.

Recommended checks:

1. Open `index.html` and verify the navigation links to Settings and Map.
2. Open `user-prefs.html`, save preferences, and confirm the selected colors
   apply after reloading pages.
3. Open `map.html` without `js/maps-config.js` and confirm the configuration
   warning appears.
4. Add a valid `js/maps-config.js`, reload `map.html`, and confirm the map
   initializes.
5. Click the map to add a place, then verify `Go`, delete, and CSV download
   behavior.
6. Trigger `My Location` in a browser that supports geolocation and confirm the
   map recenters after permission is granted.
7. Search the repository for committed Google Maps keys before publishing:

   ```sh
   rg "AIza[0-9A-Za-z_-]+" .
   ```

## AI Notice

This repository may be maintained with help from AI coding assistants. All
AI-assisted changes should be reviewed by a human maintainer before merge,
release, or publication.

## Changelog And Release References

See [CHANGELOG.md](CHANGELOG.md) for pending and released repository changes.

No release tag or public release process is documented for this repository yet.
Keep the project under `[Unreleased]` until a deliberate release-preparation
step is completed.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
