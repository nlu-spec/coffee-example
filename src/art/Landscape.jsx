import { useMemo } from 'react'

function rng(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const ridge = (x, base, amp, f, ph) => base + Math.sin(x / f + ph) * amp + Math.sin(x / (f * 0.43) + ph * 2) * amp * 0.35

function hillPath(base, amp, f, ph) {
  let d = `M-40 900 L-40 ${ridge(-40, base, amp, f, ph)}`
  for (let x = -40; x <= 1640; x += 40) d += ` L${x} ${ridge(x, base, amp, f, ph).toFixed(1)}`
  return d + ' L1640 900 Z'
}

export default function Landscape({ className }) {
  const d = useMemo(() => {
    const r = rng(11)
    const bushes = []
    for (let row = 0; row < 11; row++) {
      const step = 18 + row * 3.6
      const size = 10 + row * 3.1
      for (let x = -30 + (row % 2) * step * 0.5; x < 1640; x += step) {
        const jx = (r() - 0.5) * step * 0.4
        const y = ridge(x, 560, 46, 230, 1.2) + 40 + row * 30 + (r() - 0.5) * 6
        const l = 10 + row * 1.5 + r() * 5
        bushes.push({
          x: x + jx, y, rx: size * (0.9 + r() * 0.3), ry: size * 0.62,
          fill: `hsl(${108 + r() * 22} ${30 + r() * 14}% ${l}%)`,
          hi: `hsl(${98 + r() * 20} ${38 + r() * 12}% ${l + 8}%)`,
        })
      }
    }
    const trees = Array.from({ length: 9 }).map((_, i) => {
      const x = 80 + i * 185 + (r() - 0.5) * 90
      const gy = ridge(x, 560, 46, 230, 1.2) + 60 + r() * 60
      const h = 330 + r() * 200
      const blobs = Array.from({ length: 9 }).map(() => ({
        cx: x + (r() - 0.5) * 150, cy: gy - h + (r() - 0.5) * 60, r: 34 + r() * 34, l: 11 + r() * 8,
      }))
      return { x, gy, h, w: 9 + r() * 7, blobs }
    })
    const cherries = Array.from({ length: 34 }).map(() => ({
      x: 40 + r() * 360, y: 640 + r() * 220, r: 4 + r() * 3.5,
    }))
    return { bushes, trees, cherries }
  }, [])

  return (
    <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="ls-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8fa9a1" />
          <stop offset=".35" stopColor="#d9d3b4" />
          <stop offset=".62" stopColor="#c9d0b0" />
          <stop offset="1" stopColor="#7e9a6a" />
        </linearGradient>
        <radialGradient id="ls-sun" cx=".68" cy=".2" r=".5">
          <stop offset="0" stopColor="#fff6cf" stopOpacity=".95" />
          <stop offset=".35" stopColor="#ffe9a8" stopOpacity=".4" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ls-mist" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#eaf0d8" stopOpacity="0" />
          <stop offset=".5" stopColor="#eaf0d8" stopOpacity=".7" />
          <stop offset="1" stopColor="#eaf0d8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ls-ground" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3d6a2a" />
          <stop offset="1" stopColor="#12260c" />
        </linearGradient>
        <linearGradient id="ls-ray" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff6cf" stopOpacity=".5" />
          <stop offset="1" stopColor="#fff6cf" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ls-vig" cx=".5" cy=".5" r=".75">
          <stop offset=".55" stopColor="#0a1405" stopOpacity="0" />
          <stop offset="1" stopColor="#0a1405" stopOpacity=".55" />
        </radialGradient>
        <filter id="ls-blur"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="ls-blur2"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>

      <rect width="1600" height="900" fill="url(#ls-sky)" />
      <rect width="1600" height="900" fill="url(#ls-sun)" />

      {/* far ridges */}
      <path d={hillPath(330, 40, 210, 0.4)} fill="#9db3a0" opacity=".7" filter="url(#ls-blur)" />
      <path d={hillPath(390, 44, 180, 2.1)} fill="#7f9c82" opacity=".85" filter="url(#ls-blur)" />
      <rect y="330" width="1600" height="120" fill="url(#ls-mist)" filter="url(#ls-blur2)" />
      <path d={hillPath(450, 52, 250, 3.3)} fill="#5f8660" />
      <rect y="420" width="1600" height="110" fill="url(#ls-mist)" opacity=".8" filter="url(#ls-blur2)" />

      {/* terrace ground */}
      <path d={hillPath(540, 46, 230, 1.2)} fill="url(#ls-ground)" />

      {/* shade trees (silver oak) */}
      {d.trees.map((t, i) => (
        <g key={i}>
          <path d={`M${t.x - t.w} ${t.gy} L${t.x - t.w * 0.45} ${t.gy - t.h} L${t.x + t.w * 0.45} ${t.gy - t.h} L${t.x + t.w} ${t.gy} Z`} fill="#2a1d12" />
          <path d={`M${t.x - t.w * 0.2} ${t.gy} L${t.x - t.w * 0.05} ${t.gy - t.h} L${t.x + t.w * 0.1} ${t.gy - t.h} L${t.x + t.w * 0.35} ${t.gy} Z`} fill="#4a3321" opacity=".7" />
          {t.blobs.map((b, j) => (
            <circle key={j} cx={b.cx} cy={b.cy} r={b.r} fill={`hsl(118 38% ${b.l}%)`} />
          ))}
          {t.blobs.slice(0, 5).map((b, j) => (
            <circle key={'h' + j} cx={b.cx - b.r * 0.3} cy={b.cy - b.r * 0.3} r={b.r * 0.55} fill={`hsl(105 45% ${b.l + 9}%)`} opacity=".7" />
          ))}
        </g>
      ))}

      {/* coffee bush rows */}
      {d.bushes.map((b, i) => (
        <g key={i}>
          <ellipse cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} fill={b.fill} />
          <ellipse cx={b.x - b.rx * 0.2} cy={b.y - b.ry * 0.35} rx={b.rx * 0.6} ry={b.ry * 0.4} fill={b.hi} opacity=".75" />
        </g>
      ))}

      {/* pickers */}
      {[
        { x: 520, y: 690, s: 1, c: '#c0392b' },
        { x: 690, y: 722, s: 1.25, c: '#e0a526' },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
          <ellipse cx="0" cy="40" rx="26" ry="6" fill="#0c1a07" opacity=".4" />
          <path d="M-14 40 L-10 -4 Q0 -10 10 -4 L14 40 Z" fill={p.c} />
          <path d="M-14 12 Q0 22 14 12 L14 40 L-14 40Z" fill="#1d2d3e" opacity=".9" />
          <circle cx="0" cy="-16" r="9" fill="#7a4a2b" />
          <path d="M-10 -18 Q0 -34 10 -18 Q4 -22 -10 -18Z" fill={p.c} />
          <ellipse cx="22" cy="14" rx="13" ry="9" fill="#8b5a2b" />
          <path d="M10 6 Q18 -6 30 8" fill="none" stroke="#5a3a1a" strokeWidth="2.4" />
        </g>
      ))}

      {/* lower mist + light rays */}
      <rect y="640" width="1600" height="120" fill="url(#ls-mist)" opacity=".45" filter="url(#ls-blur2)" />
      <g filter="url(#ls-blur)" opacity=".55">
        <polygon points="1010,-20 1130,-20 760,900 560,900" fill="url(#ls-ray)" opacity=".5" />
        <polygon points="1160,-20 1230,-20 1050,900 920,900" fill="url(#ls-ray)" opacity=".4" />
        <polygon points="880,-20 940,-20 520,900 420,900" fill="url(#ls-ray)" opacity=".35" />
      </g>

      {/* foreground branch with cherries */}
      <g>
        <path d="M-20 900 C90 780 200 700 420 640" fill="none" stroke="#1c2a10" strokeWidth="9" strokeLinecap="round" />
        {[
          [90, 790, -30], [170, 740, -40], [260, 700, -20], [350, 668, -10], [60, 840, -55], [220, 770, 20], [320, 710, 25],
        ].map(([x, y, a], i) => (
          <path key={i} d="M0 0 C18 -26 58 -26 80 0 C58 18 18 18 0 0Z" fill={i % 2 ? '#1f4a17' : '#2a5c1e'} transform={`translate(${x} ${y}) rotate(${a})`} />
        ))}
        {d.cherries.slice(0, 14).map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={i % 3 ? '#b3201a' : '#d9421f'} />
        ))}
      </g>
      <g transform="translate(1600 0) scale(-1 1)">
        <path d="M-20 900 C70 800 150 760 300 720" fill="none" stroke="#14210a" strokeWidth="8" strokeLinecap="round" />
        {[[70, 800, -30], [150, 765, -30], [230, 736, -15], [100, 850, -60]].map(([x, y, a], i) => (
          <path key={i} d="M0 0 C18 -26 58 -26 80 0 C58 18 18 18 0 0Z" fill="#1a3d12" transform={`translate(${x} ${y}) rotate(${a})`} />
        ))}
        {d.cherries.slice(14, 22).map((c, i) => (
          <circle key={i} cx={c.x * 0.6} cy={c.y + 40} r={c.r} fill="#b3201a" />
        ))}
      </g>

      <rect width="1600" height="900" fill="url(#ls-vig)" />
    </svg>
  )
}
