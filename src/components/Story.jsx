import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { Tumbler, Davara } from '../art/Brass'
import Drips from '../art/Drips'
import { Bean } from '../art/Pouch'
import { useViewport } from '../lib'

/* Stage design size is 520 x 600; everything inside is positioned in these units */
const SW = 520
const SH = 600

export default function Story() {
  const ref = useRef(null)
  const { w, h } = useViewport()
  const mobile = w < 860
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 })

  const scale = Math.min(1.12, mobile ? (w * 0.98) / SW : 9, (h * (mobile ? 0.5 : 0.86)) / SH)
  const shift = mobile ? 0 : Math.min(w * 0.19, 300)

  /* hero → story */
  const curtainY = useTransform(p, [0.015, 0.13], ['0%', '-112%'])
  const wordsO = useTransform(p, [0, 0.07], [1, 0])
  const wordL = useTransform(p, [0, 0.1], [0, -260])
  const wordR = useTransform(p, [0, 0.1], [0, 260])
  const heroInfoO = useTransform(p, [0, 0.06], [1, 0])
  const stageX = useTransform(p, [0.08, 0.2], [0, shift])
  const stageS = useTransform(p, [0, 0.12], [0.94, 1])
  const bgPos = useTransform(p, [0, 1], ['50% 20%', '50% 90%'])

  /* tumbler choreography */
  const rot = useTransform(p, [0.3, 0.5, 0.8, 0.93], [0, -126, -126, -150])
  const tx = useTransform(p, [0.3, 0.5, 0.8, 0.93], [0, 62, 62, 220])
  const ty = useTransform(p, [0.3, 0.5, 0.8, 0.93], [0, -30, -30, -90])
  const tO = useTransform(p, [0.9, 0.97], [1, 0])
  const float = useTransform(p, [0, 0.3], [0, -6])

  /* pour */
  const streamS = useTransform(p, [0.455, 0.5], [0, 1])
  const streamCut = useTransform(p, [0.8, 0.87], [0, 100])
  const streamClip = useMotionTemplate`inset(${streamCut}% 0% 0% 0%)`
  const streamO = useTransform(p, [0.455, 0.47, 0.87, 0.9], [0, 1, 1, 0])
  const coffee = useTransform(p, [0.5, 0.78], [0, 1])
  const froth = useTransform(p, [0.78, 0.93], [0, 1])
  const glow = useTransform(p, [0.8, 0.95], [0.5, 1])

  /* chapters */
  const c1o = useTransform(p, [0.12, 0.18, 0.28, 0.33], [0, 1, 1, 0])
  const c1y = useTransform(p, [0.12, 0.18, 0.28, 0.33], [40, 0, 0, -40])
  const c2o = useTransform(p, [0.36, 0.42, 0.6, 0.66], [0, 1, 1, 0])
  const c2y = useTransform(p, [0.36, 0.42, 0.6, 0.66], [40, 0, 0, -40])
  const c3o = useTransform(p, [0.7, 0.77, 0.99], [0, 1, 1])
  const c3y = useTransform(p, [0.7, 0.77], [40, 0])

  /* progress track */
  const trackW = useTransform(p, [0.12, 0.97], ['0%', '100%'])
  const trackO = useTransform(p, [0.1, 0.16], [0, 1])

  return (
    <section className="story" ref={ref} id="ritual">
      <div className="story-sticky">
        <motion.div className="story-bg" style={{ backgroundPosition: bgPos }} />
        <motion.div className="story-glow" style={{ opacity: glow }} />

        {/* dark curtain with drips */}
        <motion.div className="curtain" style={{ y: curtainY }}>
          <div className="curtain-fill" />
          <Drips />
        </motion.div>

        {/* hero words */}
        <motion.h1 className="hero-word hw-l" style={{ x: wordL, opacity: wordsO }}>Filter</motion.h1>
        <motion.h1 className="hero-word hw-r" style={{ x: wordR, opacity: wordsO }}>Coffee</motion.h1>

        <motion.div className="hero-info hi-l" style={{ opacity: heroInfoO }}>
          <p>
            Hand-picked in the hills of Coorg, wood-roasted in small batches and poured the way it has
            always been — from a height, in brass.
          </p>
          <a href="#blends" className="link-arrow">Shop the blends <span>→</span></a>
        </motion.div>
        <motion.div className="hero-info hi-r" style={{ opacity: heroInfoO }}>
          <div className="big25">25</div>
          <p>years of the<br />same pour</p>
        </motion.div>
        <motion.div className="scroll-cue" style={{ opacity: heroInfoO }}>
          <span>Scroll to pour</span>
          <i />
        </motion.div>

        {/* THE STAGE */}
        <motion.div
          className="stage"
          style={{ x: stageX, top: mobile ? '40%' : '53%', marginLeft: -SW / 2, marginTop: -SH / 2 }}
        >
          <motion.div style={{ width: SW, height: SH, scale: stageS, position: 'relative' }}>
            <div style={{ width: SW, height: SH, transform: `scale(${scale})`, transformOrigin: 'center', position: 'relative' }}>
              <div className="stage-shadow" />

              <div className="st-davara">
                <Davara layer="back" coffee={coffee} froth={froth} />
              </div>

              {/* tumbler */}
              <motion.div className="st-tumbler-anchor" style={{ y: float }}>
                <motion.div className="st-tumbler" style={{ x: tx, y: ty, rotate: rot, opacity: tO }}>
                  <Tumbler />
                </motion.div>
              </motion.div>

              {/* stream */}
              <motion.div className="st-stream-wrap" style={{ clipPath: streamClip, opacity: streamO }}>
                <motion.div className="st-stream" style={{ scaleY: streamS }} />
              </motion.div>

              <div className="st-davara st-front">
                <Davara layer="front" />
              </div>

              {/* hero beans */}
              <div className="st-bean b1"><Bean size={34} rot={-24} /></div>
              <div className="st-bean b2"><Bean size={26} rot={40} /></div>
              <div className="st-bean b3"><Bean size={30} rot={160} /></div>
            </div>
          </motion.div>
        </motion.div>

        {/* chapters */}
        <div className="chapters">
          <motion.div className="chapter" style={{ opacity: c1o, y: c1y }}>
            <span className="eyebrow">I — The vessel</span>
            <h2>Served in brass,<br /><em>as it always was.</em></h2>
            <p>Brass holds the heat and softens the sip. Our tumbler and davara are cast in Kumbakonam and hammered by hand — the way your grandmother’s were.</p>
          </motion.div>
          <motion.div className="chapter" style={{ opacity: c2o, y: c2y }}>
            <span className="eyebrow">II — The pour</span>
            <h2>Then the<br /><em>metre pour.</em></h2>
            <p>From a height, back and forth, again and again — cooling the coffee, lifting the aroma, and raising the foam that makes it kaapi.</p>
          </motion.div>
          <motion.div className="chapter" style={{ opacity: c3o, y: c3y }}>
            <span className="eyebrow">III — The froth</span>
            <h2>Froth, and then<br /><em>silence.</em></h2>
            <p>That first sip, when the room goes quiet. Twenty-five years, and we still make it for exactly this moment.</p>
          </motion.div>
        </div>

        {/* progress */}
        <motion.div className="track" style={{ opacity: trackO }}>
          <div className="track-line">
            <motion.div className="track-fill" style={{ width: trackW }} />
            <motion.div className="track-bean" style={{ left: trackW }}><Bean size={22} rot={20} /></motion.div>
          </div>
          <div className="track-labels"><span>Brass</span><span>Pour</span><span>Froth</span></div>
        </motion.div>
      </div>
    </section>
  )
}
