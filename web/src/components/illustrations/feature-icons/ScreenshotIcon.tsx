export function ScreenshotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Browser window */}
      <rect x="4" y="6" width="34" height="28" rx="4" fill="#1A1A1A" />
      <rect x="7" y="14" width="28" height="17" rx="2" fill="white" />

      {/* Browser header dots */}
      <circle cx="10" cy="10" r="2" fill="#FF5F57" />
      <circle cx="16" cy="10" r="2" fill="#FFBD2E" />
      <circle cx="22" cy="10" r="2" fill="#28CA42" />

      {/* Content representation */}
      <rect x="10" y="17" width="12" height="3" rx="1" fill="#E8E8E8" />
      <rect x="10" y="22" width="22" height="6" rx="1" fill="#FFC93F" />

      {/* Camera icon */}
      <circle cx="38" cy="36" r="9" fill="#F05335" />
      <circle cx="38" cy="36" r="5" fill="white" />
      <circle cx="38" cy="36" r="3" fill="#F05335" />
    </svg>
  )
}
