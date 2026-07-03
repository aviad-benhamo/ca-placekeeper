# Google Maps Configuration

PlaceKeeper uses the Google Maps JavaScript API. Do not commit real Google Maps API keys to this repository.

## Local setup

1. Copy `js/maps-config.example.js` to `js/maps-config.js`.
2. Replace `YOUR_GOOGLE_MAPS_API_KEY` with a Google Maps browser key.
3. Keep `js/maps-config.js` local. It is ignored by Git.
4. Open `map.html` through the project's usual static workflow.

## Google Cloud requirements

- Rotate or revoke any key that was previously committed.
- Create a new browser API key for local development.
- Restrict the key to the Google Maps JavaScript API.
- Add HTTP referrer restrictions that match the local or deployed origins that need to run the app.
- Do not reuse unrestricted or production keys for local exercises.

## Verification

Before sharing or publishing the repository, search the working tree for committed Google Maps keys:

```sh
rg "AIza[0-9A-Za-z_-]+" .
```

The search should return no committed real keys.
