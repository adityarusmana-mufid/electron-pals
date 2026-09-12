import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

export const widgetWindowOptions = {
  width: 230,
  height: 280,
  frame: false,
  resizable: false,
  alwaysOnTop: false,
  x: undefined,
  y: 0,
  backgroundColor: '#bce8ff',
  icon: join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'icon.png'),
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true,
    preload: join(dirname(fileURLToPath(import.meta.url)), 'preload.cjs'),
  },
}