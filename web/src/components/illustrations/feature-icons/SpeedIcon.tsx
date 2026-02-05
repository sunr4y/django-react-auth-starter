export function SpeedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Speedometer background */}
      <path
        d="M8 32 A16 16 0 1 1 40 32"
        stroke="#E5E5E5"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Speed indicator arc */}
      <path
        d="M8 32 A16 16 0 0 1 36 14"
        stroke="#48C76D"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Center point */}
      <circle cx="24" cy="32" r="4" fill="#1A1A1A" />

      {/* Needle */}
      <line
        x1="24"
        y1="32"
        x2="34"
        y2="18"
        stroke="#F05335"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Speed text */}
      <text
        x="24"
        y="44"
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize="8"
        fontWeight="bold"
      >
        &lt;2s
      </text>
    </svg>
  )
}
