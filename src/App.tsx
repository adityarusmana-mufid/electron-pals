import { useRef, useState } from 'react'
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
  'Me-wow, look at that window.',
  'Six blinks and a tail flick = yes.',
  'Hiss off, I was napping.',
  'Sitting on your keyboard: full stack dev.',
  'The lap is lava. Just kidding, sit down.',
  'This box was made for me.',
  'Cat made of the darkest coffee.',
  'I drink gravity, I am a cat.',
  'Knocked it over. Again. No regrets.',
  'Error 404: f?ps not found.',
  'I purr, therefore I am.',
  'Customer: give me that 3am speedrun meow.',
  'Cats do not chase mice in heavy armor.',
  'A broken clock is right 2 meows a day.',
  'One biscuit for the tail there, please.',
]

function useCycle<T>(items: T[]) {
  const deck = useRef<T[]>([])

  const next = () => {
    if (deck.current.length === 0) {
      deck.current = [...items]
      for (let i = deck.current.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[deck.current[i], deck.current[j]] = [deck.current[j], deck.current[i]]
      }
    }
    return deck.current.pop() as T
  }

  return next
}

export default function App() {
  const nextCat = useCycle(catGifs)
  const nextQuote = useCycle(catQuotes)
  const [status, setStatus] = useState(nextQuote)
  const [catSrc, setCatSrc] = useState(nextCat)
  const [pinned, setPinned] = useState(false)

  const refresh = () => {
    setStatus('Finding another cat...')
    setCatSrc(nextCat())
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
              onLoad={() => setStatus(nextQuote())}
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
