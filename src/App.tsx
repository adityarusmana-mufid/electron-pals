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
        <div className="star star-one" />
        <div className="star star-two" />
        <div className="star star-three" />
        <div className="electron">
          <div className="orbit orbit-a"><i /></div>
          <div className="orbit orbit-b"><i /></div>
          <div className="orbit orbit-c"><i /></div>
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
        <button
          type="button"
          onClick={() => {
            setStatus('Finding another cat...')
            setFrame((value) => value + 1)
          }}
        >
          Recharge with cat
        </button>
        <p aria-live="polite">{status}</p>
      </div>
    </main>
  )
}
