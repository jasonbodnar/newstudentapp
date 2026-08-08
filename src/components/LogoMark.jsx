// HandRail mark: a hand gripping a handrail. Art-only (no background) —
// the surrounding .mark element supplies the brand-blue rounded square.
export default function LogoMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <g transform="rotate(-18 24 24)">
        <rect x="-6" y="21" width="60" height="7" rx="3.5" fill="#ffffff" opacity="0.5" />
        <rect x="27" y="-6" width="9.5" height="19" rx="4.75" fill="#fff" transform="rotate(14 32 4)" />
        <rect x="14" y="10.5" width="20" height="12" rx="6" fill="#fff" />
        <rect x="15.5" y="18" width="3.6" height="11" rx="1.8" fill="#fff" />
        <rect x="20.3" y="18" width="3.6" height="12" rx="1.8" fill="#fff" />
        <rect x="25.1" y="18" width="3.6" height="12" rx="1.8" fill="#fff" />
        <rect x="29.9" y="18" width="3.6" height="11" rx="1.8" fill="#fff" />
      </g>
    </svg>
  )
}
