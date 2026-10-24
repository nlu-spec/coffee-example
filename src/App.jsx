import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { CartProvider } from './lib'
import { BrassDefs } from './art/Brass'
import { Preloader, Nav, CartDrawer } from './components/Chrome'
import Story from './components/Story'
import { Marquee, Pack, Method, Origin, Voices, Footer } from './components/Sections'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const click = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href').slice(1)
      const el = id === 'top' ? document.body : document.getElementById(id)
      if (el) { e.preventDefault(); lenis.scrollTo(id === 'top' ? 0 : el, { offset: 0 }) }
    }
    document.addEventListener('click', click)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener('click', click) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden'
  }, [loaded])

  return (
    <CartProvider>
      <BrassDefs />
      <AnimatePresence>{!loaded && <Preloader done={() => setLoaded(true)} />}</AnimatePresence>
      <div id="top" />
      <Nav />
      <main>
        <Story />
        <Marquee />
        <Pack />
        <Method />
        <Origin />
        <Voices />
      </main>
      <Footer />
      <CartDrawer />
      <div className="grain" aria-hidden />
    </CartProvider>
  )
}
