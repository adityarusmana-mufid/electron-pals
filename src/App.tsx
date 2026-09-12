import { useState } from 'react'
import sky from './assets/sky.jpg'

const catModules = import.meta.glob('./assets/cats/cat-*.gif', { eager: true }) as Record<
  string,
  { default: string }
>
const catGifs = Object.values(catModules).map((module) => module.default)

const catQuotes = [
  "I'm not lazy, I'm in energy-saving mode.",
  'Meow means feed me in 12 languages.',
  'Today is a pawsome day.',
  'If I fit, I sit.',
  'I need space to store my catnip.',
  'Purring is my superpower.',
  'I dream in catnip and tuna.',
  'Zoomies engage!',
  'I identify as a loaf.',
  "Sorry for the cat hair, it's a gift.",
]

const randomItem = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)]

export default function App() {
  const [status, setStatus] = useState(randomItem(catQuotes))
  const [catSrc, setCatSrc] = useState(() => randomItem(catGifs))
  const [pinned, setPinned] = useState(false)

  const refresh = () => {
    setStatus('Finding another cat...')
    setCatSrc(randomItem(catGifs))
  }

  const togglePin = () => {
    const next = !pinned
    setPinned(next)
    window.electronPals?.pin(next)
  }

  return (
    <main className="widget">
      <div className="drag-bar">
        <span>TINY CLOUD COMPANION</span>
        <span className="drag-actions">
          <button
            type="button"
            className={pinned ? 'pin pinned' : 'pin'}
            aria-label="Pin widget to top"
            aria-pressed={pinned}
            onClick={togglePin}
          >
            ⌃
          </button>
          <button type="button" aria-label="Close widget" onClick={() => window.close()}>
            x
          </button>
        </span>
      </div>
      <section className="sky" aria-label="Animated cat electron">
        <img className="sky-bg" src={sky} alt="" aria-hidden="true" />
        <div className="electron">
          <div className="orbit orbit-a"><i /></div>
          <div className="orbit orbit-b"><i /></div>
          <div className="orbit orbit-c"><i /></div>
          <div className="nucleus">
            <img
              src={catSrc}
              alt="An animated random cat"
              onLoad={() => setStatus(randomItem(catQuotes))}
              onError={() => setStatus('Cat signal lost. Try another one.')}
            />
          </div>
        </div>
      </section>
      <div className="controls">
        <p aria-live="polite">{status}</p>
        <button type="button" onClick={refresh}>
          Refresh cat
        </button>
      </div>
    </main>
  )
}
