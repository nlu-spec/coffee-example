import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Words, Reveal, Magnetic, useCart, inr, useViewport } from '../lib'
import { PRODUCTS, STEPS, QUOTES } from '../data'
import Pouch, { Bean } from '../art/Pouch'
import Landscape from '../art/Landscape'

/* ============ Marquee ============ */
export function Marquee() {
  const words = ['Hand-picked', 'Wood-roasted', 'Metre-poured', 'Brass-served', 'Since 1999']
  const row = [...words, ...words, ...words, ...words]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i}>{w}<i>✦</i></span>
        ))}
      </div>
    </div>
  )
}

/* ============ Hero pack ============ */
function FloatBean({ b, p }) {
  const y = useTransform(p, [0, 1], [b.d * 140, b.d * -180])
  const r = useTransform(p, [0, 1], [b.r, b.r + b.d * 160])
  return (
    <motion.div className="fbean" style={{ left: b.x + '%', top: b.y + '%', y, rotate: r, filter: `blur(${b.blur}px)` }}>
      <Bean size={b.s} />
    </motion.div>
  )
}

const BEANS = [
  { x: 4, y: 58, s: 62, d: 1.1, r: -30, blur: 0 },
  { x: 14, y: 72, s: 86, d: 1.6, r: 20, blur: 2 },
  { x: 24, y: 50, s: 40, d: 0.7, r: 70, blur: 0 },
  { x: 30, y: 80, s: 54, d: 0.9, r: -70, blur: 0 },
  { x: 8, y: 84, s: 38, d: 0.5, r: 120, blur: 0 },
  { x: 72, y: 54, s: 44, d: 0.8, r: 10, blur: 0 },
  { x: 80, y: 74, s: 92, d: 1.7, r: -50, blur: 3 },
  { x: 90, y: 60, s: 60, d: 1.2, r: 100, blur: 0 },
  { x: 66, y: 84, s: 50, d: 0.6, r: 40, blur: 0 },
  { x: 93, y: 84, s: 40, d: 0.4, r: -110, blur: 0 },
  { x: 48, y: 90, s: 36, d: 0.3, r: 20, blur: 0 },
]

export function Pack() {
  const ref = useRef(null)
  const { add } = useCart()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bagY = useTransform(p, [0, 1], [60, -60])
  const bagR = useTransform(p, [0, 0.5, 1], [-4, 0, 4])
  const prod = PRODUCTS[0]
  return (
    <section className="pack" id="blends" ref={ref}>
      <svg className="wave-top" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden>
        <path d="M0 0 H1440 V30 C1200 90 960 0 720 30 C480 60 240 0 0 40 Z" fill="#7a3114" />
      </svg>
      <div className="pack-inner">
        <Words as="h2" className="display pack-title" text="Take the ritual *home.*" />
        <Reveal delay={0.2}>
          <p className="lede">Stone-ground, small-lot, sealed within a day of roasting. Brew it in any South Indian filter and it will do the rest.</p>
        </Reveal>
        <Reveal delay={0.3}>
          <Magnetic className="btn btn-dark" onClick={() => add(prod)}>
            {inr(prod.price)} <span className="dot" /> Add Classic to bag
          </Magnetic>
        </Reveal>
        <div className="pack-stage">
          {BEANS.map((b, i) => <FloatBean key={i} b={b} p={p} />)}
          <motion.div className="pack-bag" style={{ y: bagY, rotate: bagR }}>
            <Pouch tone="classic" name="Classic" sub="80 : 20 Chicory Blend" weight="250 g" />
          </motion.div>
        </div>
      </div>

      {/* blends */}
      <div className="blends">
        <div className="blends-head">
          <Reveal><span className="eyebrow dark">The collection</span></Reveal>
          <Words as="h3" className="h-lg" text="Three roasts. *One ritual.*" />
        </div>
        <div className="cards">
          {PRODUCTS.map((pr, i) => (
            <Reveal key={pr.id} delay={i * 0.12} className="card-wrap">
              <motion.article className="card" whileHover="hover" initial="rest">
                <div className="card-top">
                  <span className="tag">{pr.tag}</span>
                  <span className="roast">
                    {Array.from({ length: 5 }).map((_, k) => <i key={k} className={k < pr.roast ? 'on' : ''} />)}
                    <em>roast</em>
                  </span>
                </div>
                <motion.div className="card-pouch" variants={{ rest: { y: 0, rotate: 0, scale: 1 }, hover: { y: -14, rotate: -3, scale: 1.04 } }} transition={{ type: 'spring', stiffness: 160, damping: 14 }}>
                  <Pouch tone={pr.tone} name={pr.name} sub={pr.sub} weight={pr.weight} />
                </motion.div>
                <div className="card-body">
                  <h4>{pr.name}</h4>
                  <ul>{pr.notes.map((n) => <li key={n}>{n}</li>)}</ul>
                  <div className="card-foot">
                    <b>{inr(pr.price)}</b>
                    <button className="btn btn-ghost sm" onClick={() => add(pr)}>Add to bag <span>+</span></button>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ Method ============ */
function Icon({ i }) {
  const common = { width: 54, height: 54, viewBox: '0 0 64 64', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (i === 0) return <svg {...common}><path d="M32 8c6 8 12 14 12 24a12 12 0 0 1-24 0c0-6 3-9 6-13 1 4 3 6 5 7-1-6-1-11 1-18z" /><path d="M14 56h36" /></svg>
  if (i === 1) return <svg {...common}><path d="M18 14h28l-4 14H22z" /><path d="M22 28v12h20V28" /><path d="M46 14l6-6" /><path d="M16 52h32M24 44h16" /></svg>
  if (i === 2) return <svg {...common}><path d="M16 12h32M20 12l4 16h16l4-16" /><path d="M32 34v6M32 46v.5" /><path d="M20 56h24l-3-10H23z" /></svg>
  return <svg {...common}><path d="M22 10h20l-3 24H25z" /><path d="M32 34v12" /><path d="M14 54h36q-3-8-18-8t-18 8z" /></svg>
}

export function Method() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const w = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), { stiffness: 90, damping: 20 })
  return (
    <section className="method" id="method" ref={ref}>
      <div className="method-inner">
        <Reveal><span className="eyebrow">The method</span></Reveal>
        <Words className="display m-title" text="Four patient *steps.*" />
        <div className="method-line"><motion.i style={{ width: w }} /></div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="step">
              <div className="step-n">{s.n}</div>
              <div className="step-ic"><Icon i={i} /></div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ Origin (arch → full bleed) ============ */
export function Origin() {
  const ref = useRef(null)
  const { w, h } = useViewport()
  const mobile = w < 760
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.4 })
  const w0 = mobile ? 250 : 330
  const h0 = Math.round(w0 * 1.32)

  const fw = useTransform(p, [0.04, 0.5], [w0, w])
  const fh = useTransform(p, [0.04, 0.5], [h0, h])
  const fr = useTransform(p, [0.04, 0.5], [w0 / 2, 0])
  const fy = useTransform(p, [0, 0.04], [mobile ? 40 : 70, mobile ? 40 : 70])
  const imgS = useTransform(p, [0.04, 0.55, 1], [1.5, 1.12, 1])
  const titleO = useTransform(p, [0, 0.1, 0.2], [1, 1, 0])
  const titleY = useTransform(p, [0, 0.2], [0, -80])
  const c1o = useTransform(p, [0.42, 0.52, 0.7, 0.76], [0, 1, 1, 0])
  const c1y = useTransform(p, [0.42, 0.52], [40, 0])
  const dim = useTransform(p, [0.7, 0.82], [0, 0.62])
  const fo = useTransform(p, [0.74, 0.84], [0, 1])
  const fz = useTransform(p, [0.74, 0.9], [30, 0])
  const spin = useTransform(p, [0, 1], [0, 360])

  return (
    <section className="origin" id="estate" ref={ref}>
      <div className="origin-sticky">
        <motion.div className="origin-title" style={{ opacity: titleO, y: titleY }}>
          <h2>From the hills <em>of Coorg</em></h2>
          <span>Sakleshpur · Western Ghats · India</span>
        </motion.div>

        <motion.div className="arch" style={{ width: fw, height: fh, borderTopLeftRadius: fr, borderTopRightRadius: fr, y: fy }}>
          <motion.div className="arch-img" style={{ scale: imgS }}><Landscape /></motion.div>
          <motion.div className="arch-dim" style={{ opacity: dim }} />

          <motion.div className="origin-copy" style={{ opacity: c1o, y: c1y }}>
            <span className="eyebrow">The estate</span>
            <h2>Grown in<br /><em>the shade.</em></h2>
            <p>Beneath silver oak and jackfruit, our coffee ripens slowly at 1,100 metres. Thirty-eight families pick by hand, cherry by red cherry, from November to February.</p>
          </motion.div>

          <motion.div className="badge" style={{ opacity: c1o, rotate: spin }}>
            <svg viewBox="0 0 120 120" width="120" height="120">
              <defs><path id="circ" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" /></defs>
              <text fontFamily="Manrope" fontSize="10.5" letterSpacing="3.6" fill="#f6ecdc" fontWeight="600">
                <textPath href="#circ">SHADE GROWN · HAND PICKED · SINGLE ESTATE ·</textPath>
              </text>
              <circle cx="60" cy="60" r="20" fill="none" stroke="#e9c25c" strokeWidth="1.2" />
              <path d="M52 52h16l-2 12q-6 2-12 0z" fill="#e9c25c" />
            </svg>
          </motion.div>

          <motion.div className="finale" style={{ opacity: fo, y: fz }}>
            <svg width="68" height="68" viewBox="0 0 40 40" aria-hidden>
              <path d="M8 6h24l-3 22q-9 4-18 0z" fill="#f3d27a" />
              <path d="M3 30h34q-2 8-17 8T3 30z" fill="#c99a2e" />
            </svg>
            <h2>KAVERI</h2>
            <p>Twenty-five years of the same pour.</p>
            <Magnetic className="btn btn-brass" onClick={() => document.getElementById('blends').scrollIntoView({ behavior: 'smooth' })}>
              Shop the blends
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============ Numbers + quotes ============ */
export function Voices() {
  const stats = [['1,100 m', 'Estate elevation'], ['38', 'Growing families'], ['4 hrs', 'Roast-to-seal window'], ['25 yrs', 'Of the same pour']]
  return (
    <section className="voices">
      <div className="stats">
        {stats.map(([n, l], i) => (
          <Reveal key={l} delay={i * 0.08} className="stat">
            <b>{n}</b><span>{l}</span>
          </Reveal>
        ))}
      </div>
      <div className="quotes-head">
        <Reveal><span className="eyebrow dark">Kind words</span></Reveal>
        <Words as="h3" className="h-lg" text="Poured, *and remembered.*" />
      </div>
      <div className="quotes">
        {QUOTES.map((q, i) => (
          <Reveal key={q.a} delay={i * 0.1} className="quote">
            <div className="qmark">“</div>
            <p>{q.q}</p>
            <footer><b>{q.a}</b><span>{q.c}</span></footer>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ============ Footer ============ */
export function Footer() {
  return (
    <footer className="footer">
      <div className="foot-top">
        <div className="news">
          <h3>Join the <em>morning pour.</em></h3>
          <p>Brewing notes, harvest updates and first access to limited lots. Never more than twice a month.</p>
          <form onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); alert('Thank you — see you at the next pour.') }}>
            <input type="email" required placeholder="you@email.com" aria-label="Email" />
            <button className="btn btn-brass" type="submit">Subscribe</button>
          </form>
        </div>
        <div className="cols">
          <div><h5>Shop</h5><a href="#blends">Classic</a><a href="#blends">Peaberry</a><a href="#blends">Estate AA</a><a href="#blends">Brass set</a></div>
          <div><h5>Ritual</h5><a href="#ritual">The pour</a><a href="#method">The method</a><a href="#estate">The estate</a></div>
          <div><h5>Visit</h5><span>14, Coffee Board Rd</span><span>Sakleshpur, Karnataka</span><span>hello@kaveri.coffee</span></div>
        </div>
      </div>
      <div className="giant" aria-hidden>KAVERI</div>
      <div className="foot-bot">
        <span>© {new Date().getFullYear()} Kaveri Filter Coffee. Concept design.</span>
        <span>Handcrafted in India ✦ Poured with patience</span>
      </div>
    </footer>
  )
}
