export function OgImageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Social card */}
      <rect
        x="4"
        y="8"
        width="36"
        height="24"
        rx="4"
        fill="white"
        stroke="#E5E5E5"
        strokeWidth="1.5"
      />

      {/* Image area */}
      <rect x="7" y="11" width="14" height="10" rx="2" fill="#4285F4" />
      <path
        d="M9 19 L12 15 L15 18 L19 13 L21 19 Z"
        fill="white"
        opacity="0.6"
      />

      {/* Title lines */}
      <rect x="24" y="12" width="14" height="3" rx="1" fill="#1A1A1A" />
      <rect x="24" y="17" width="10" height="2" rx="1" fill="#999" />

      {/* URL bar */}
      <rect x="7" y="24" width="30" height="5" rx="2" fill="#F5F5F5" />
      <rect x="10" y="26" width="16" height="1.5" rx="0.5" fill="#999" />

      {/* Share icons */}
      <circle cx="16" cy="40" r="6" fill="#1DA1F2" />
      <circle cx="30" cy="40" r="6" fill="#0A66C2" />
      <circle cx="44" cy="40" r="6" fill="#1877F2" />
    </svg>
  )
}
