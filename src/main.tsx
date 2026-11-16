import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { enableBarAutoHide, enableSmoothWheel } from './smoothScroll'

document.documentElement.classList.add('js')
enableSmoothWheel()
enableBarAutoHide()
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

// Dark boot loader (markup + CSS live in index.html): keep it up briefly, then fade it out once the page is ready.
const boot = document.getElementById('boot')
if (boot) {
  const started = performance.now()
  const hide = () => {
    const wait = Math.max(0, 1100 - (performance.now() - started))
    setTimeout(() => {
      boot.classList.add('done')
      setTimeout(() => boot.remove(), 700)
    }, wait)
  }
  if (document.readyState === 'complete') hide()
  else addEventListener('load', hide, { once: true })
}
