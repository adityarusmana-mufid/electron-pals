import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { widgetWindowOptions } from './window-options.mjs'

const root = fileURLToPath(new URL('..', import.meta.url))
let window

function createWindow() {
  window = new BrowserWindow(widgetWindowOptions)
  window.loadFile(join(root, 'dist', 'index.html'))
}

ipcMain.on('set-pinned', (_event, pinned) => {
  window?.setAlwaysOnTop(Boolean(pinned))
})

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())
