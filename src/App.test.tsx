import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the widget and initial cat image', () => {
    const page = renderToStaticMarkup(<App />)

    expect(page).toContain('TINY CLOUD COMPANION')
    expect(page).toContain('Close widget')
    expect(page).toContain('Pin widget to top')
    expect(page).toMatch(/\/src\/assets\/cats\/cat-\d+\.gif/)
  })
})
