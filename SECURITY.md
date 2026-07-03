# Security Policy

## Supported Versions

This repository currently supports the latest version available on the `main`
branch.

## Reporting a Vulnerability

Please report security concerns privately to the repository owner instead of
opening a public GitHub issue.

Include:

- A clear description of the issue.
- Steps to reproduce it, when possible.
- Any relevant browser, operating system, or configuration details.

The maintainer will review reports as soon as practical and will coordinate a
fix before public disclosure when the issue is confirmed.

## Secrets Policy

Do not commit API keys, passwords, tokens, certificates, private keys, or real
user data to this repository.

For Google Maps setup, copy `js/maps-config.example.js` to
`js/maps-config.js`, add a local browser key, and keep the local config file
untracked.
