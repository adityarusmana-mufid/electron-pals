import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the electron playground and initial cat image', () => {
    const page = renderToStaticMarkup(<App />)

    expect(page).toContain('Electron Pals')
    expect(page).toContain('Recharge with cat')
    expect(page).toContain('https://cataas.com/cat/gif?width=180&amp;height=180&amp;t=0')
  })
})
