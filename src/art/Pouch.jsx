import { useId } from 'react'

export const TONES = {
  classic: { bag: ['#8b2a1c', '#4d1209'], label: '#f5e9d3', ink: '#3a1308', accent: '#b8802a' },
  peaberry: { bag: ['#1f3a2c', '#0c1d15'], label: '#f1e6cf', ink: '#10281c', accent: '#c19a3d' },
  estate: { bag: ['#2b2a3d', '#12111d'], label: '#efe4d0', ink: '#1a1830', accent: '#cf9b3b' },
}

export function Bean({ size = 40, rot = 0 }) {
  return (
    <svg width={size} height={size * 0.68} viewBox="0 0 60 40" style={{ transform: `rotate(${rot}deg)`, overflow: 'visible' }}>
      <defs>
        <radialGradient id="bean-g" cx=".35" cy=".3" r=".9">
          <stop offset="0" stopColor="#b8503a" />
          <stop offset=".55" stopColor="#7a2417" />
          <stop offset="1" stopColor="#3b0f08" />
        </radialGradient>
      </defs>
      <ellipse cx="30" cy="20" rx="28" ry="18" fill="url(#bean-g)" />
      <path d="M6 22 C20 10 38 30 54 16" fill="none" stroke="#2a0a05" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="20" cy="12" rx="9" ry="3.5" fill="#fff" opacity=".25" transform="rotate(-18 20 12)" />
    </svg>
  )
}

export default function Pouch({ tone = 'classic', name = 'Classic', sub = '80 : 20 Chicory Blend', weight = '250 g' }) {
  const t = TONES[tone]
  const id = useId().replace(/:/g, '')
  const crimp = Array.from({ length: 28 }).map((_, i) => 12 + i * 9.6)
  return (
    <svg viewBox="0 0 300 420" width="100%" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <linearGradient id={`bag${id}`} x1="0" x2="1">
          <stop offset="0" stopColor={t.bag[1]} />
          <stop offset=".18" stopColor={t.bag[0]} />
          <stop offset=".5" stopColor={t.bag[0]} />
          <stop offset=".85" stopColor={t.bag[1]} />
          <stop offset="1" stopColor={t.bag[0]} />
        </linearGradient>
        <linearGradient id={`gloss${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".22" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".3" stopColor="#fff" stopOpacity="0" />
          <stop offset=".78" stopColor="#fff" stopOpacity="0" />
          <stop offset=".86" stopColor="#fff" stopOpacity=".12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`sh${id}`} x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="22" stdDeviation="18" floodColor="#2a0f05" floodOpacity=".35" />
        </filter>
      </defs>
      <g filter={`url(#sh${id})`}>
        <path d="M18 12 L282 12 Q290 14 288 26 L296 396 Q296 408 284 408 L16 408 Q4 408 4 396 L12 26 Q10 14 18 12 Z" fill={`url(#bag${id})`} />
        {/* crimps */}
        <rect x="12" y="12" width="276" height="26" fill="#000" opacity=".12" />
        {crimp.map((x) => (
          <line key={x} x1={x} x2={x} y1="14" y2="36" stroke="#fff" strokeOpacity=".18" strokeWidth="1.4" />
        ))}
        <rect x="6" y="382" width="288" height="24" fill="#000" opacity=".14" />
        {crimp.map((x) => (
          <line key={x} x1={x} x2={x} y1="384" y2="404" stroke="#fff" strokeOpacity=".16" strokeWidth="1.4" />
        ))}
        <path d="M18 12 L282 12 Q290 14 288 26 L296 396 Q296 408 284 408 L16 408 Q4 408 4 396 L12 26 Q10 14 18 12 Z" fill={`url(#gloss${id})`} />
        {/* label */}
        <rect x="38" y="72" width="224" height="268" rx="112" ry="112" fill={t.label} />
        <rect x="46" y="80" width="208" height="252" rx="104" ry="104" fill="none" stroke={t.accent} strokeWidth="1.2" />
        {/* mini tumbler emblem */}
        <g transform="translate(130 106)">
          <path d="M2 2 L38 2 L33 52 Q20 56 7 52 Z" fill={t.accent} />
          <path d="M-6 54 L46 54 Q42 72 20 73 Q-2 72 -6 54 Z" fill={t.accent} opacity=".85" />
          <path d="M9 8 Q8 30 11 48" stroke="#fff" strokeOpacity=".6" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        <text x="150" y="124" textAnchor="middle" fontFamily="Manrope" fontSize="0" fill={t.ink}>.</text>
        <text x="150" y="212" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontWeight="600" fontSize="44" letterSpacing="5" fill={t.ink}>KAVERI</text>
        <text x="150" y="234" textAnchor="middle" fontFamily="Manrope" fontWeight="600" fontSize="9.5" letterSpacing="4" fill={t.accent}>FILTER COFFEE</text>
        <line x1="108" x2="192" y1="250" y2="250" stroke={t.accent} strokeWidth="1" />
        <text x="150" y="278" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontWeight="500" fontSize="24" fill={t.ink}>{name}</text>
        <text x="150" y="298" textAnchor="middle" fontFamily="Manrope" fontSize="9" letterSpacing="1.5" fill={t.ink} opacity=".7">{sub}</text>
        <text x="150" y="320" textAnchor="middle" fontFamily="Manrope" fontWeight="700" fontSize="9" letterSpacing="3" fill={t.ink} opacity=".85">{weight.toUpperCase()}</text>
      </g>
    </svg>
  )
}
