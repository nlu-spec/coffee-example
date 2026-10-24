import { motion } from 'framer-motion'

/* Shared metal gradients */
export function BrassDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <linearGradient id="g-brass" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#5e3709" />
          <stop offset=".1" stopColor="#a7731c" />
          <stop offset=".24" stopColor="#e9c25c" />
          <stop offset=".34" stopColor="#fff2b8" />
          <stop offset=".46" stopColor="#e7b84a" />
          <stop offset=".64" stopColor="#a56f16" />
          <stop offset=".82" stopColor="#d9a63a" />
          <stop offset=".93" stopColor="#f0cd73" />
          <stop offset="1" stopColor="#6b400b" />
        </linearGradient>
        <linearGradient id="g-shade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset=".6" stopColor="#2a1300" stopOpacity=".12" />
          <stop offset="1" stopColor="#2a1300" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id="g-inner" x1="0" x2="1">
          <stop offset="0" stopColor="#3a2005" />
          <stop offset=".5" stopColor="#8a5c14" />
          <stop offset="1" stopColor="#2f1903" />
        </linearGradient>
        <linearGradient id="g-streak" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".2" stopColor="#fff" stopOpacity=".75" />
          <stop offset=".8" stopColor="#fff" stopOpacity=".45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="g-coffee" cx=".5" cy=".4" r=".7">
          <stop offset="0" stopColor="#6a2d10" />
          <stop offset=".7" stopColor="#2c0f05" />
          <stop offset="1" stopColor="#170602" />
        </radialGradient>
        <radialGradient id="g-froth" cx=".5" cy=".4" r=".7">
          <stop offset="0" stopColor="#fdf0d6" />
          <stop offset=".75" stopColor="#e8c48c" />
          <stop offset="1" stopColor="#b98448" />
        </radialGradient>
      </defs>
    </svg>
  )
}

/* The tumbler (the tall cup) — 200 x 262 */
export function Tumbler() {
  const body = 'M26 14 Q100 27 174 14 L158 246 Q100 260 42 246 Z'
  return (
    <svg viewBox="0 0 200 262" width="100%" height="100%" style={{ overflow: 'visible', display: 'block' }}>
      <ellipse cx="100" cy="14" rx="75" ry="11" fill="url(#g-inner)" />
      <path d={body} fill="url(#g-brass)" />
      <path d={body} fill="url(#g-shade)" />
      {/* hammered rings */}
      {[64, 112, 196].map((y, i) => (
        <g key={y}>
          <path d={`M${30 + i * 2} ${y} Q100 ${y + 13} ${170 - i * 2} ${y}`} fill="none" stroke="#4d2c05" strokeOpacity=".5" strokeWidth="1.6" />
          <path d={`M${30 + i * 2} ${y + 2.5} Q100 ${y + 15.5} ${170 - i * 2} ${y + 2.5}`} fill="none" stroke="#fff3b5" strokeOpacity=".55" strokeWidth="1" />
        </g>
      ))}
      {/* highlights */}
      <path d="M58 30 Q54 130 62 238 L74 240 Q66 130 70 32 Z" fill="url(#g-streak)" opacity=".85" />
      <path d="M138 34 Q142 130 134 236 L128 236 Q134 130 130 34 Z" fill="url(#g-streak)" opacity=".4" />
      {/* lip */}
      <path d="M25 14 Q100 28 175 14" fill="none" stroke="#fff0b0" strokeWidth="3.2" strokeLinecap="round" />
      <ellipse cx="100" cy="14" rx="75" ry="11" fill="none" stroke="#c99429" strokeWidth="2" />
      {/* base bevel */}
      <path d="M42 246 Q100 260 158 246" fill="none" stroke="#2c1602" strokeOpacity=".55" strokeWidth="3" />
    </svg>
  )
}

/* Davara (the wide saucer-bowl). layer = 'back' draws rim + coffee, 'front' draws the front wall */
export function Davara({ layer = 'back', coffee, froth }) {
  if (layer === 'back') {
    return (
      <svg viewBox="0 0 320 150" width="100%" height="100%" style={{ overflow: 'visible', display: 'block' }}>
        <ellipse cx="160" cy="30" rx="152" ry="17" fill="url(#g-brass)" />
        <ellipse cx="160" cy="30" rx="140" ry="12.5" fill="url(#g-inner)" />
        <motion.ellipse cx="160" cy="31" rx="137" ry="11" fill="url(#g-coffee)" style={{ opacity: coffee }} />
        <motion.g style={{ opacity: froth }}>
          <ellipse cx="160" cy="29" rx="137" ry="11" fill="url(#g-froth)" />
          <ellipse cx="160" cy="26.5" rx="118" ry="7.5" fill="#fbebcc" opacity=".8" />
          {Array.from({ length: 70 }).map((_, i) => {
            const a = (i * 137.5 * Math.PI) / 180
            const r = Math.sqrt(i / 70)
            return (
              <circle
                key={i}
                cx={160 + Math.cos(a) * r * 126}
                cy={29 + Math.sin(a) * r * 8.2}
                r={1.3 + ((i * 7) % 5) * 0.55}
                fill="#fffaf0"
                fillOpacity=".9"
                stroke="#d9ad72"
                strokeOpacity=".55"
                strokeWidth=".5"
              />
            )
          })}
        </motion.g>
      </svg>
    )
  }
  const wall = 'M8 30 Q160 62 312 30 C308 100 268 141 160 143 C52 141 12 100 8 30 Z'
  return (
    <svg viewBox="0 0 320 150" width="100%" height="100%" style={{ overflow: 'visible', display: 'block' }}>
      <ellipse cx="160" cy="146" rx="72" ry="5" fill="#1a0a03" opacity=".45" />
      <path d={wall} fill="url(#g-brass)" />
      <path d={wall} fill="url(#g-shade)" />
      <path d="M24 74 Q160 108 296 74" fill="none" stroke="#4d2c05" strokeOpacity=".45" strokeWidth="1.6" />
      <path d="M24 77 Q160 111 296 77" fill="none" stroke="#fff3b5" strokeOpacity=".5" strokeWidth="1" />
      <path d="M44 42 Q60 100 92 128" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" />
      <path d="M8 30 Q160 62 312 30" fill="none" stroke="#fff0b0" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  )
}
