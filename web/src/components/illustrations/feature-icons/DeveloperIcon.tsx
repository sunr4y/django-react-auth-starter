export function DeveloperIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Terminal window */}
      <rect x="4" y="6" width="40" height="32" rx="4" fill="#1A1A1A" />

      {/* Terminal header */}
      <rect x="4" y="6" width="40" height="8" rx="4" fill="#2D2D2D" />
      <circle cx="10" cy="10" r="2" fill="#FF5F57" />
      <circle cx="16" cy="10" r="2" fill="#FFBD2E" />
      <circle cx="22" cy="10" r="2" fill="#28CA42" />

      {/* Code lines */}
      <text x="8" y="22" fill="#48C76D" fontSize="6" fontFamily="monospace">
        $
      </text>
      <rect x="14" y="18" width="24" height="3" rx="1" fill="#FFC93F" />
      <rect x="8" y="25" width="20" height="2" rx="1" fill="#64B5F6" />
      <rect x="8" y="30" width="28" height="2" rx="1" fill="#F05335" />

      {/* Code brackets */}
      <text x="40" y="44" fill="#F05335" fontSize="10" fontWeight="bold">
        {"</>"}
      </text>
    </svg>
  )
}
