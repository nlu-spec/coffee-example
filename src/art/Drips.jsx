/* Dark coffee "curtain" edge with animated drips */
const N = 15
const drips = Array.from({ length: N }).map((_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const r = seed / 233280
  return {
    x: (i + 0.5) * (1000 / N) + (r - 0.5) * 30,
    w: 22 + r * 26,
    h: 60 + ((i * 53) % 130),
    d: 3.4 + ((i * 17) % 40) / 10,
    delay: -((i * 37) % 50) / 10,
  }
})

export default function Drips() {
  const wave = Array.from({ length: 41 }).map((_, i) => {
    const x = i * 25
    const y = 26 + Math.sin(i * 0.9) * 9
    return `${i === 0 ? 'M' : 'L'}${x} ${y}`
  })
  return (
    <svg className="drips" viewBox="0 0 1000 260" preserveAspectRatio="none" aria-hidden>
      <path d={`M0 -2 ${wave.join(' ')} L1000 -2 Z`} fill="#1b0c06" />
      {drips.map((d, i) => (
        <g key={i} className="drip" style={{ animationDuration: `${d.d}s`, animationDelay: `${d.delay}s` }}>
          <rect x={d.x - d.w / 2} y="10" width={d.w} height={d.h} rx={d.w / 2} fill="#1b0c06" />
          <circle cx={d.x} cy={d.h + 6} r={d.w * 0.62} fill="#1b0c06" />
        </g>
      ))}
    </svg>
  )
}
