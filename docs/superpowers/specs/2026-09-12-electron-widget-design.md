# Electron Pals Desktop Widget Design

## Goal

Turn Electron Pals from a browser demo into a small Linux desktop application using Electron, with a fixed `360x520` widget window.

## Chosen Approach

Electron adds a Node.js main process that creates the native window and loads the existing React/Vite renderer. This is the requested Electron framework, not the Tauri alternative. Electron Forge and extra packaging tooling are out of scope for this test app.

## Window

The app opens as a frameless, non-resizable `360x520` window. It is not always-on-top. The renderer reserves a narrow drag region at the top because a frameless window has no native title bar. Closing the window quits the app on Linux.

The main process loads the Vite dev server during development and the built `dist/index.html` in production. Its renderer settings keep `nodeIntegration` disabled, context isolation enabled, and sandboxing enabled. No desktop APIs need to cross the preload boundary.

## Visual Design

The React page becomes a compact widget scene:

- `Press Start 2P` provides the small display heading and button labels.
- `Pixelify Sans` provides readable pixel-styled supporting text and status.
- A pastel blue pixel-sky background uses blocky CSS clouds, sun, and stars.
- The animated cat remains the electron core, with orbit rings as a small accent rather than the primary visual.
- The existing button refreshes the CATAAS GIF and reports image loading failures.

## Validation

Vitest continues covering the cat URL and initial renderer markup. A main-process unit test verifies the widget window options. `npm run build` builds the renderer. `npm run desktop` opens the Electron window for visual review.
