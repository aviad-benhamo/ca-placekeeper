# Local Development Workflow

PlaceKeeper is a static HTML, CSS, and JavaScript project. It does not have a
build step, test runner, or backend service.

## Recommended workflow

Use a local static server from the repository root.

### Node.js workflow

1. Install the Node.js version declared in `.nvmrc`, or use a compatible Node
   24 release.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the local server:

   ```sh
   npm run serve
   ```

4. Open `http://localhost:8000/index.html`.

### Python fallback

If Node.js tooling is unavailable, you can run a simple static server with
Python:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## Direct file opening

Opening `index.html` directly with `file://` can work for basic navigation and
simple local storage flows, but it is not the recommended workflow.

Use a local static server when:

- validating the Google Maps page
- checking browser behavior that depends on a regular origin
- reproducing shared setup instructions for other developers or AI agents

## Browser assumptions and limitations

- JavaScript must be enabled.
- `localStorage` must be available for places and user preferences to persist.
- Google Maps requires internet access and a valid browser API key.
- Geolocation depends on browser support and user permission.
- Some browsers restrict geolocation more heavily outside secure contexts; use
  `http://localhost` during QA when testing location behavior.

## Configuration summary

- Copy `js/maps-config.example.js` to `js/maps-config.js`.
- Set `window.PLACEKEEPER_MAPS_API_KEY` to a restricted Google Maps browser key.
- Keep `js/maps-config.js` local and uncommitted.

For the detailed key-handling workflow, see
[maps-configuration.md](maps-configuration.md).
