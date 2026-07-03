# Validation Workflow

PlaceKeeper uses a lightweight hybrid validation process:

- automated Node-based checks for stable logic and repository safety
- manual browser QA for interactive map behavior

This balance is intentional for a small static Coding Academy project.

## Automated validation

Run the baseline validation command before finishing a change:

```sh
npm run validate
```

This command currently covers:

- `npm run test`
  - verifies place persistence logic
  - verifies user preferences persistence logic
  - verifies missing Google Maps key handling
  - verifies graceful alert behavior when location is requested before the map
    is ready
  - verifies CSV export generation
- `npm run check:secrets`
  - scans tracked app files for committed Google Maps API key candidates

## Manual QA

Automated checks do not replace browser verification for the full map flow.

Run this checklist when your change touches UI behavior, storage behavior, map
behavior, or configuration:

1. Start the app with `npm run serve`.
2. Open `http://localhost:8000/index.html` and verify navigation works.
3. Open `user-prefs.html`, save preferences, and confirm they persist after
   reload.
4. Open `map.html` without `js/maps-config.js` and confirm the missing-key
   message appears.
5. Add a valid local `js/maps-config.js`, reload `map.html`, and confirm the
   map initializes.
6. Add a place by clicking the map and verify it appears in the list.
7. Use `Go` on a saved place and confirm the map recenters.
8. Remove a saved place and confirm it disappears from the list.
9. Trigger `My Location` and confirm it either recenters the map or fails with
   a user-facing alert.
10. Download the CSV export and confirm the saved places are included.

## When to use which level

- Documentation-only or low-risk changes:
  - run `npm run validate`
- UI, storage, or map behavior changes:
  - run `npm run validate`
  - run the manual QA checklist

## Current limitations

- The automated suite does not exercise the live Google Maps API.
- Geolocation success still requires manual browser verification.
- The automated suite focuses on regression-prone local logic and safe fallback
  behavior.
