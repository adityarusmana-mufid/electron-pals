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
