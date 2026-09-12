# Electron Widget Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run Electron Pals as a fixed-size Electron desktop widget with a pastel pixel-sky React interface.

**Architecture:** Electron's main process creates a secure native `BrowserWindow` and loads the Vite production bundle. The existing React app remains the sandboxed renderer. A pure ESM module contains window options so Vitest can verify widget configuration without starting Electron.

**Tech Stack:** Electron 44, React 19, TypeScript, Vite, Vitest, CSS.

---

### Task 1: Add Electron startup configuration

**Files:**
- Modify: `package.json`
- Create: `electron/main.mjs`
- Create: `electron/window-options.mjs`

- [ ] **Step 1: Add Electron's package entry and commands**

```json
{
  "main": "electron/main.mjs",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "desktop": "npm run build && electron .",
    "test": "vitest run"
  },
  "devDependencies": {
    "electron": "^44.3.0"
  }
}
```

- [ ] **Step 2: Install Electron**

Run: `npm install`

Expected: `package-lock.json` records Electron 44 and installation exits successfully.

- [ ] **Step 3: Commit the package configuration**

```bash
git add package.json package-lock.json
git commit -m "chore: add Electron runtime"
```

### Task 2: Create and test the secure widget window

**Files:**
- Create: `electron/window-options.test.ts`
- Create: `electron/window-options.mjs`
- Create: `electron/main.mjs`

- [ ] **Step 1: Write the failing window-options test**

```ts
import { describe, expect, it } from 'vitest'
import { widgetWindowOptions } from './window-options.mjs'

describe('widgetWindowOptions', () => {
  it('creates a fixed, secure widget window', () => {
    expect(widgetWindowOptions).toMatchObject({
      width: 360,
      height: 520,
      frame: false,
      resizable: false,
      alwaysOnTop: false,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    })
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test -- electron/window-options.test.ts`

Expected: FAIL because `window-options.mjs` is absent.

- [ ] **Step 3: Add the pure window-options module**

```js
export const widgetWindowOptions = {
  width: 360,
  height: 520,
  frame: false,
  resizable: false,
  alwaysOnTop: false,
  backgroundColor: '#bce8ff',
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true,
  },
}
```

- [ ] **Step 4: Create the Electron lifecycle entry point**

```js
import { app, BrowserWindow } from 'electron'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { widgetWindowOptions } from './window-options.mjs'

const root = fileURLToPath(new URL('..', import.meta.url))

function createWindow() {
  const window = new BrowserWindow(widgetWindowOptions)
  window.loadFile(join(root, 'dist', 'index.html'))
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())
```

- [ ] **Step 5: Run the options test and commit**

Run: `npm test -- electron/window-options.test.ts`

Expected: PASS with one test passing.

```bash
git add electron/window-options.mjs electron/window-options.test.ts electron/main.mjs
git commit -m "feat: add secure Electron widget window"
```

### Task 3: Redesign the React renderer as a pixel-sky widget

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Extend the page test with the widget close control**

```tsx
expect(page).toContain('Close widget')
expect(page).toContain('TINY CLOUD COMPANION')
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because the old browser page has neither widget label nor close control.

- [ ] **Step 3: Replace the page with a compact widget layout**

```tsx
import { useState } from 'react'
import { catGifUrl } from './electron'

export default function App() {
  const [frame, setFrame] = useState(0)
  const [status, setStatus] = useState('A cloud-charged cat is ready.')

  return (
    <main className="widget">
      <div className="drag-bar">
        <span>TINY CLOUD COMPANION</span>
        <button type="button" aria-label="Close widget" onClick={() => window.close()}>x</button>
      </div>
      <section className="sky" aria-label="Animated cat electron">
        <div className="sun" /><div className="cloud cloud-one" /><div className="cloud cloud-two" />
        <div className="electron">
          <div className="orbit orbit-a"><i /></div><div className="orbit orbit-b"><i /></div><div className="orbit orbit-c"><i /></div>
          <div className="nucleus"><img src={catGifUrl(frame)} alt="An animated random cat" onLoad={() => setStatus('Cat core stable. Meow.')} onError={() => setStatus('Cat signal lost. Try another one.')} /></div>
        </div>
      </section>
      <div className="controls">
        <p aria-live="polite">{status}</p>
        <button type="button" onClick={() => { setStatus('Finding another cat...'); setFrame((value) => value + 1) }}>Refresh cat</button>
      </div>
    </main>
  )
}
```

Use `Press Start 2P` only for the compact heading and controls. Use `Pixelify Sans` for the status and explanatory copy. Keep the cat image `alt` text, its load/error status, and its cache-key refresh button behavior.

- [ ] **Step 4: Replace the stylesheet with the pastel pixel-sky system**

```css
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@500;700&family=Press+Start+2P&display=swap');

* { box-sizing: border-box; }
body { width: 360px; height: 520px; margin: 0; overflow: hidden; color: #183052; font-family: 'Pixelify Sans', sans-serif; background: #bce8ff; }
button { font: inherit; cursor: pointer; }
.widget { min-height: 100%; background: linear-gradient(#bce8ff 0 58%, #dff5ff 58%); }
.drag-bar { display: flex; align-items: center; justify-content: space-between; height: 38px; padding: 0 9px 0 13px; color: #315178; font-family: 'Press Start 2P', monospace; font-size: 7px; -webkit-app-region: drag; }
.drag-bar button, .controls button { -webkit-app-region: no-drag; }
.drag-bar button { width: 22px; height: 22px; border: 3px solid #315178; color: #315178; background: #fff6c5; font-family: 'Press Start 2P', monospace; font-size: 9px; }
.sky { position: relative; height: 335px; overflow: hidden; border-block: 4px solid #315178; background: #9edcff; }
.sun { position: absolute; top: 28px; right: 35px; width: 42px; height: 42px; background: #fff6c5; box-shadow: 8px 0 #fff6c5, 0 8px #fff6c5, -8px 8px #fff6c5; }
.cloud { position: absolute; width: 78px; height: 20px; background: #edfaff; box-shadow: 14px -14px #edfaff, 34px -8px #edfaff, 55px 0 #edfaff; }
.cloud-one { top: 72px; left: 25px; }.cloud-two { right: 70px; bottom: 53px; transform: scale(.7); }
.electron { position: absolute; top: 50%; left: 50%; width: 205px; aspect-ratio: 1; transform: translate(-50%, -50%); }
.orbit { position: absolute; inset: 7px; border: 4px solid #548ec2; border-radius: 50%; animation: spin 6s linear infinite; }.orbit-b { transform: rotate(60deg) scaleX(.63); animation-direction: reverse; }.orbit-c { transform: rotate(120deg) scaleX(.63); animation-duration: 8s; }
.orbit i { position: absolute; top: -9px; left: 48%; width: 16px; height: 16px; border: 3px solid #315178; background: #ff9eb5; }
.nucleus { position: absolute; z-index: 1; top: 50%; left: 50%; width: 94px; aspect-ratio: 1; overflow: hidden; border: 5px solid #315178; transform: translate(-50%, -50%); background: #fff6c5; }.nucleus img { width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated; }
.controls { display: grid; place-items: center; gap: 10px; padding: 18px 20px; text-align: center; }.controls p { min-height: 22px; margin: 0; font-size: 16px; font-weight: 700; }.controls button { border: 4px solid #315178; box-shadow: 5px 5px 0 #548ec2; padding: 11px 14px; color: #183052; background: #fff6c5; font-family: 'Press Start 2P', monospace; font-size: 9px; }.controls button:focus-visible, .drag-bar button:focus-visible { outline: 3px solid #ff6d93; outline-offset: 3px; }.controls button:active { transform: translate(3px, 3px); box-shadow: 2px 2px 0 #548ec2; }
@keyframes spin { to { rotate: 360deg; } }
@media (prefers-reduced-motion: reduce) { .orbit { animation: none; } }
```

Use rectangular cloud blocks, a pale blue base color, and high-contrast navy text. Preserve focus-visible styling and reduce orbit animations under `prefers-reduced-motion`.

- [ ] **Step 5: Run all renderer tests and build**

Run: `npm test && npm run build`

Expected: all tests pass and Vite produces `dist/index.html`.

- [ ] **Step 6: Launch the desktop app and inspect it**

Run: `npm run desktop`

Expected: a `360x520` frameless Electron window opens, can be dragged by its top bar, shows the pixel sky and cat core, refreshes the cat, and closes from the `x` button.

- [ ] **Step 7: Commit the widget renderer**

```bash
git add src/App.tsx src/App.test.tsx src/index.css
git commit -m "feat: redesign Electron Pals as sky widget"
```
