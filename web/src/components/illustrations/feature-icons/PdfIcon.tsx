export function PdfIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Document */}
      <rect
        x="8"
        y="4"
        width="26"
        height="34"
        rx="3"
        fill="white"
        stroke="#E5E5E5"
        strokeWidth="1.5"
      />

      {/* PDF badge */}
      <rect x="22" y="1" width="20" height="12" rx="3" fill="#F05335" />
      <text
        x="32"
        y="10"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontWeight="bold"
      >
        PDF
      </text>

      {/* Content lines */}
      <rect x="12" y="14" width="14" height="3" rx="1" fill="#1A1A1A" />
      <rect x="12" y="20" width="18" height="2" rx="1" fill="#E8E8E8" />
      <rect x="12" y="25" width="16" height="2" rx="1" fill="#E8E8E8" />
      <rect x="12" y="30" width="12" height="2" rx="1" fill="#E8E8E8" />

      {/* Checkmark */}
      <circle cx="38" cy="34" r="8" fill="#48C76D" />
      <path
        d="M34 34 L37 37 L42 32"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
