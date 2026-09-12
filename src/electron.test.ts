import { describe, expect, it } from 'vitest'
import { catGifUrl } from './electron'

describe('catGifUrl', () => {
  it('uses the frame value to bypass the image cache', () => {
    expect(catGifUrl(7)).toBe('https://cataas.com/cat/gif?width=240&height=240&t=7')
  })
})
