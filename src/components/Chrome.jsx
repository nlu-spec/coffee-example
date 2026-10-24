import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart, inr, Magnetic } from '../lib'
import Pouch from '../art/Pouch'

export function Preloader({ done }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let v = 0
    const t = setInterval(() => {
      v += 4 + Math.random() * 9
      if (v >= 100) { v = 100; clearInterval(t); setTimeout(done, 350) }
      setN(Math.floor(v))
    }, 55)
    return () => clearInterval(t)
  }, [done])
  return (
    <motion.div className="preloader" exit={{ y: '-100%' }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>
      <div className="pre-mark">KAVERI</div>
      <div className="pre-sub">Filter coffee · est. 1999</div>
      <div className="pre-bar"><i style={{ width: n + '%' }} /></div>
      <div className="pre-n">{String(n).padStart(2, '0')}</div>
    </motion.div>
  )
}

export function Nav() {
  const { count, setOpen } = useCart()
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <motion.header
      className={'nav' + (solid ? ' solid' : '')}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <a href="#top" className="logo" aria-label="Kaveri">
        <svg width="26" height="26" viewBox="0 0 40 40" aria-hidden>
          <path d="M8 6h24l-3 22q-9 4-18 0z" fill="#e9c25c" />
          <path d="M3 30h34q-2 8-17 8T3 30z" fill="#c99a2e" />
        </svg>
        <span>KAVERI</span>
      </a>
      <nav className="nav-links">
        <a href="#ritual">The Ritual</a>
        <a href="#blends">The Pack</a>
        <a href="#method">The Method</a>
        <a href="#estate">The Estate</a>
      </nav>
      <button className="cart-btn" onClick={() => setOpen(true)} aria-label="Open cart">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        <span>Bag</span>
        <b>{count}</b>
      </button>
    </motion.header>
  )
}

export function CartDrawer() {
  const { open, setOpen, items, inc, total } = useCart()
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="drawer-head">
              <h3>Your bag</h3>
              <button onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>
            <div className="drawer-body">
              {items.length === 0 && <p className="empty">Your bag is empty.<br />The kettle is waiting.</p>}
              {items.map((i) => (
                <div className="line" key={i.id}>
                  <div className="line-img"><Pouch tone={i.tone} name={i.name} sub={i.sub} weight={i.weight} /></div>
                  <div className="line-info">
                    <h4>{i.name}</h4>
                    <span>{i.weight} · {inr(i.price)}</span>
                    <div className="qty">
                      <button onClick={() => inc(i.id, -1)}>−</button>
                      <b>{i.qty}</b>
                      <button onClick={() => inc(i.id, 1)}>+</button>
                    </div>
                  </div>
                  <div className="line-total">{inr(i.price * i.qty)}</div>
                </div>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="row"><span>Subtotal</span><b>{inr(total)}</b></div>
              <p>{total >= 999 ? 'Free shipping applied ✓' : `Add ${inr(Math.max(0, 999 - total))} more for free shipping`}</p>
              <Magnetic className="btn btn-brass wide" strength={0.15} onClick={() => alert('Demo checkout — connect your payment gateway here.')}>
                Checkout
              </Magnetic>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
