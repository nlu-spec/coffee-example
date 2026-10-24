import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ---------- viewport ---------- */
export function useViewport() {
  const get = () => ({ w: window.innerWidth, h: window.innerHeight })
  const [v, setV] = useState(get)
  useEffect(() => {
    const f = () => setV(get())
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])
  return v
}

/* ---------- reveal helpers ---------- */
const ease = [0.2, 0.7, 0.2, 1]

export function Reveal({ children, delay = 0, y = 40, className, as = 'div', style }) {
  const M = motion[as]
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </M>
  )
}

/* "Hello *italic* world" -> masked word-by-word reveal */
export function Words({ text, className, delay = 0, as = 'h2' }) {
  const M = motion[as]
  const parts = text.split('*')
  let k = 0
  return (
    <M className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }} aria-label={text.replace(/\*/g, '')}>
      {parts.map((seg, i) =>
        seg.split(' ').filter(Boolean).map((w) => {
          const idx = k++
          return (
            <span className="mask" key={idx} aria-hidden>
              <motion.span
                className={i % 2 ? 'it' : ''}
                style={{ display: 'inline-block' }}
                variants={{ hidden: { y: '115%' }, show: { y: 0 } }}
                transition={{ duration: 1.05, delay: delay + idx * 0.07, ease }}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          )
        })
      )}
    </M>
  )
}

/* ---------- magnetic ---------- */
export function Magnetic({ children, strength = 0.35, className = '', ...rest }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.button ref={ref} className={className} style={{ x, y }} onMouseMove={move} onMouseLeave={leave} {...rest}>
      {children}
    </motion.button>
  )
}

/* ---------- cart ---------- */
const CartCtx = createContext(null)
export const useCart = () => useContext(CartCtx)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const add = (p) => {
    setItems((prev) => {
      const f = prev.find((i) => i.id === p.id)
      return f ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { ...p, qty: 1 }]
    })
    setOpen(true)
  }
  const inc = (id, d) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0))
  const count = items.reduce((s, i) => s + i.qty, 0)
  const total = items.reduce((s, i) => s + i.qty * i.price, 0)
  return <CartCtx.Provider value={{ items, add, inc, open, setOpen, count, total }}>{children}</CartCtx.Provider>
}

export const inr = (n) => '₹' + n.toLocaleString('en-IN')
