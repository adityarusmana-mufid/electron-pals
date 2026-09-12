# ⚡ Electron Pals

A tiny pixel-art Electron desktop widget powered by animated cats.

## What it is

- Fixed-size frameless Electron widget: `230×280`
- Pastel pixel-sky background with local cat GIF library
- Random cat quote on every refresh
- Pin toggle keeps the widget above other windows
- Works offline once built

## Run it

```bash
npm install
npm run desktop
```

## Add more cats

```bash
node scripts/add-cat.js
```

Duplicates are automatically skipped by SHA-256 manifest.

## Tech

- Electron 44
- React 19
- Vite
- Vitest

## License

MIT
