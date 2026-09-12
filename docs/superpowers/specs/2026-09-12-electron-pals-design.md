# Electron Pals Design

## Goal

Create a small React/Vite page that visibly exercises the configured OpenAI model while remaining a fun, isolated test app. It presents a cute pixel-art electron and a changing animated cat image.

## Chosen Approach

Use Vite with React and plain CSS. The electron is CSS pixel art and the cat image loads from CATAAS with a cache-busting query value.

Alternatives considered:

- Install a cat GIF package: unnecessary dependency for one remote image.
- Draw everything on canvas: more code with no benefit for this static composition.

## Interface

The single screen contains:

- A title and short explainer.
- A central electron with a looping orbit animation.
- A cat GIF inside the electron nucleus.
- A button that increments the image URL cache key to request another cat GIF.
- A loading/error status next to the image. If CATAAS is unavailable, the rest of the app remains usable and explains the failure.

The layout is responsive and uses keyboard-focusable native controls. CSS provides the pixel aesthetic; no component library is needed.

## Structure

- `src/App.tsx`: page composition and image state.
- `src/electron.ts`: builds the CATAAS GIF URL from a numeric frame value.
- `src/electron.test.ts`: verifies the URL includes the expected cache key.
- `src/index.css`: all visual styling and animation.

## Validation

Vitest verifies the GIF URL helper. `npm run build` type-checks and builds the production bundle. A manual browser check confirms the orbit, cat refresh, image loading state, and narrow viewport layout.
