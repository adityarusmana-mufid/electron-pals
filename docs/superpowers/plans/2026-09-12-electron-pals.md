# Electron Pals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a small Vite React page with a cutesy pixel electron that displays and refreshes animated cat GIFs.

**Architecture:** A single React screen owns the cat image state. A tiny pure helper builds the CATAAS URL and is covered by Vitest. Plain CSS renders the pixel-art scene and its orbit animation, avoiding component and GIF-library dependencies.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, CSS, CATAAS image endpoint.

---

### Task 1: Create the Vite project foundation

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`

- [ ] **Step 1: Add the package manifest and TypeScript/Vite configuration**

```json
// package.json
{
  "name": "electron-pals",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^19.2.7",
    "react-dom": "^19.2.7"
  },
  "devDependencies": {
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.0.3",
    "typescript": "~6.0.2",
    "vite": "^8.1.1",
    "vitest": "^4.1.0"
  }
}
```

```json
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

```json
// tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ plugins: [react()] })
```

```html
<!-- index.html -->
<div id="root"></div><script type="module" src="/src/main.tsx"></script>
```

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
```

- [ ] **Step 2: Install the declared dependencies**

Run: `npm install`

Expected: a `package-lock.json` and `node_modules/` are created without audit or install errors.

- [ ] **Step 3: Commit the project foundation**

```bash
git add package.json package-lock.json tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html src/main.tsx
git commit -m "chore: set up Vite React app"
```

### Task 2: Build the tested cat GIF URL helper

**Files:**
- Create: `src/electron.test.ts`
- Create: `src/electron.ts`

- [ ] **Step 1: Write the failing URL test**

```ts
import { describe, expect, it } from 'vitest'
import { catGifUrl } from './electron'

describe('catGifUrl', () => {
  it('uses the frame value to bypass the image cache', () => {
    expect(catGifUrl(7)).toBe('https://cataas.com/cat/gif?width=180&height=180&t=7')
  })
})
```

- [ ] **Step 2: Verify the test fails because the helper is absent**

Run: `npm test -- src/electron.test.ts`

Expected: FAIL with a module-not-found error for `./electron`.

- [ ] **Step 3: Implement only the helper required by the test**

```ts
export function catGifUrl(frame: number) {
  return `https://cataas.com/cat/gif?width=180&height=180&t=${frame}`
}
```

- [ ] **Step 4: Verify the helper test passes**

Run: `npm test -- src/electron.test.ts`

Expected: PASS with one test passing.

- [ ] **Step 5: Commit the helper and its test**

```bash
git add src/electron.ts src/electron.test.ts
git commit -m "feat: add cat GIF URL helper"
```

### Task 3: Add the Electron Pals screen

**Files:**
- Create: `src/App.tsx`
- Create: `src/index.css`

- [ ] **Step 1: Implement the self-contained React page**

```tsx
import { useState } from 'react'
import { catGifUrl } from './electron'

export default function App() {
  const [frame, setFrame] = useState(0)
  const [status, setStatus] = useState('Warming up the cat core...')

  return (
    <main className="page-shell">
      <header>
        <p className="eyebrow">TINY PARTICLE PLAYGROUND</p>
        <h1>Electron Pals</h1>
        <p className="intro">A very excitable electron, powered by a random cat.</p>
      </header>

      <section className="lab" aria-label="Animated cat electron">
        <div className="star star-one" /><div className="star star-two" /><div className="star star-three" />
        <div className="electron">
          <div className="orbit orbit-a"><i /></div><div className="orbit orbit-b"><i /></div><div className="orbit orbit-c"><i /></div>
          <div className="nucleus">
            <img
              src={catGifUrl(frame)}
              alt="An animated random cat"
              onLoad={() => setStatus('Cat core stable. Meow.')} 
              onError={() => setStatus('Cat signal lost. Try another one.')}
            />
          </div>
        </div>
      </section>

      <div className="controls">
        <button type="button" onClick={() => { setStatus('Finding another cat...'); setFrame((value) => value + 1) }}>
          Recharge with cat
        </button>
        <p aria-live="polite">{status}</p>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Add the pixel-art responsive styling**

```css
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Nunito:wght@700;900&display=swap');

* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; background: #20194a; color: #fff7e8; font-family: Nunito, sans-serif; }
button { font: inherit; }
.page-shell { min-height: 100vh; padding: clamp(2rem, 6vw, 5rem) 1.25rem; text-align: center; background: radial-gradient(circle at 50% 42%, #684fbb 0 16%, transparent 48%), #20194a; }
header { max-width: 620px; margin: auto; }
.eyebrow, button { font-family: 'Press Start 2P', monospace; font-size: clamp(.55rem, 1.5vw, .7rem); letter-spacing: .08em; }
.eyebrow { color: #ffd166; }
h1 { margin: .65rem 0; font-size: clamp(2.2rem, 8vw, 4.8rem); line-height: .95; text-shadow: 5px 5px 0 #f25f8b; }
.intro { font-size: clamp(1rem, 2.8vw, 1.3rem); }
.lab { position: relative; width: min(74vw, 390px); aspect-ratio: 1; margin: 2.2rem auto 1.5rem; overflow: hidden; border: 5px solid #fff7e8; box-shadow: 9px 9px 0 #f25f8b; background: #34246d; }
.star { position: absolute; width: 10px; height: 10px; background: #ffd166; box-shadow: 10px 0 #ffd166, 0 10px #ffd166; }
.star-one { top: 14%; left: 13%; }.star-two { top: 23%; right: 18%; }.star-three { bottom: 18%; left: 21%; }
.electron, .nucleus { position: absolute; inset: 50% auto auto 50%; transform: translate(-50%, -50%); }
.electron { width: 68%; aspect-ratio: 1; }
.nucleus { z-index: 2; width: 43%; aspect-ratio: 1; overflow: hidden; border: 5px solid #fff7e8; border-radius: 50%; background: #f25f8b; }
.nucleus img { width: 100%; height: 100%; object-fit: cover; image-rendering: pixelated; }
.orbit { position: absolute; inset: 6%; border: 4px solid #79e0df; border-radius: 50%; animation: spin 5s linear infinite; }
.orbit i { position: absolute; width: 16px; height: 16px; top: -10px; left: 50%; background: #ffd166; border: 3px solid #fff7e8; border-radius: 50%; }
.orbit-b { transform: rotate(60deg) scaleX(.68); animation-direction: reverse; animation-duration: 4s; }.orbit-c { transform: rotate(120deg) scaleX(.68); animation-duration: 6s; }
.controls p { min-height: 1.5rem; margin: 1rem 0; font-weight: 900; }.controls button { padding: 1.1rem 1.2rem; border: 4px solid #fff7e8; box-shadow: 6px 6px 0 #f25f8b; color: #20194a; background: #ffd166; cursor: pointer; }.controls button:hover, .controls button:focus-visible { background: #79e0df; outline: 4px solid #fff7e8; outline-offset: 4px; }.controls button:active { transform: translate(4px, 4px); box-shadow: 2px 2px 0 #f25f8b; }
@keyframes spin { to { rotate: 360deg; } }
@media (prefers-reduced-motion: reduce) { .orbit { animation: none; } }
```

- [ ] **Step 3: Verify the production build**

Run: `npm run build`

Expected: TypeScript exits with code 0 and Vite reports a built `dist/` bundle.

- [ ] **Step 4: Manually verify the browser experience**

Run: `npm run dev -- --host 127.0.0.1`

Expected: The page loads at the printed local URL. The cat appears, the three orbit lines move, the button changes the cat request, and the design remains usable at 320px wide.

- [ ] **Step 5: Commit the page**

```bash
git add src/App.tsx src/index.css
git commit -m "feat: add pixel electron cat playground"
```
