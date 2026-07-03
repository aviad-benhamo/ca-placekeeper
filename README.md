# PlaceKeeper

## Project Status

Experimental Coding Academy project.

## Overview

PlaceKeeper is a small vanilla HTML, CSS, and JavaScript app for saving favorite
places and returning to them on a Google Map. It includes a home page, a user
preferences page, and a map page with saved places.

The project is intentionally simple and does not currently use a build system,
package manager, or backend server.

## Features

- Save and display favorite places.
- Store places in browser local storage.
- Open saved places on a Google Map.
- Download saved places as a CSV file.
- Configure basic user preferences such as colors and birth date.

## Quick Start

1. Clone the repository.
2. Copy `js/maps-config.example.js` to `js/maps-config.js`.
3. Replace `YOUR_GOOGLE_MAPS_API_KEY` with a restricted Google Maps browser key.
4. Open `index.html` in a browser, or serve the folder with any static file
   server.

## Configuration

The map page requires the Google Maps JavaScript API.

Local configuration lives in `js/maps-config.js`. This file is ignored by Git
because it may contain a local API key.

See [docs/maps-configuration.md](docs/maps-configuration.md) for setup and
security guidance.

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

## Development

There is no `package.json` at this stage because the project does not currently
adopt Node.js tooling, package scripts, bundling, or automated tests.

Suggested manual checks:

- Open `index.html` and verify navigation to Settings and Map.
- Open `user-prefs.html` and submit preferences.
- Open `map.html` with a valid local Google Maps API key.
- Search for committed Google Maps keys before publishing:

```sh
rg "AIza[0-9A-Za-z_-]+" .
```

## AI Notice

This repository may be maintained with help from AI coding assistants. All
AI-assisted changes should be reviewed by a human maintainer before merge or
publication.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
