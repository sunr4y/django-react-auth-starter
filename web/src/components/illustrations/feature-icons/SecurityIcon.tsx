export function SecurityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Shield */}
      <path
        d="M24 4 L40 10 L40 22 C40 32 32 40 24 44 C16 40 8 32 8 22 L8 10 L24 4 Z"
        fill="#48C76D"
      />

      {/* Inner shield */}
      <path
        d="M24 8 L36 12.5 L36 22 C36 30 30 36.5 24 40 C18 36.5 12 30 12 22 L12 12.5 L24 8 Z"
        fill="#3AB05E"
      />

      {/* Lock */}
      <rect x="18" y="20" width="12" height="10" rx="2" fill="white" />
      <path
        d="M20 20 L20 17 C20 14.5 21.5 13 24 13 C26.5 13 28 14.5 28 17 L28 20"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="24" cy="24" r="1.5" fill="#48C76D" />
      <rect x="23" y="24" width="2" height="3" rx="0.5" fill="#48C76D" />
    </svg>
  )
}
