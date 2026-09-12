import { describe, expect, it } from 'vitest'
import { widgetWindowOptions } from './window-options.mjs'

describe('widgetWindowOptions', () => {
  it('creates a fixed, secure widget window', () => {
    expect(widgetWindowOptions).toMatchObject({
      width: 300,
      height: 420,
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
