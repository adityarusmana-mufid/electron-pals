import { useState } from 'react'
import { catGifUrl } from './electron'

export default function App() {
  const [frame, setFrame] = useState(0)
  const [status, setStatus] = useState('Sky cat is ready.')

  return (
    <main className="widget">
      <div className="drag-bar">
        <span>TINY CLOUD COMPANION</span>
        <button type="button" aria-label="Close widget" onClick={() => window.close()}>x</button>
      </div>
      <section className="sky" aria-label="Animated cat electron">
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
        <p aria-live="polite">{status}</p>
        <button type="button" onClick={() => { setStatus('Finding another cat...'); setFrame((value) => value + 1) }}>Refresh cat</button>
      </div>
    </main>
  )
}
