import { motion } from "framer-motion"

export function RenderIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Browser/Engine window */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main engine container */}
        <rect x="40" y="35" width="120" height="130" rx="10" fill="#1A1A1A" />
        <rect x="48" y="55" width="104" height="100" rx="6" fill="white" />

        {/* Engine header with gears icon */}
        <rect x="40" y="35" width="120" height="22" rx="10" fill="#2D2D2D" />
        <circle cx="56" cy="46" r="4" fill="#F05335" />
        <circle cx="68" cy="46" r="4" fill="#FFC93F" />
        <circle cx="80" cy="46" r="4" fill="#48C76D" />

        {/* Chromium logo representation */}
        <motion.circle
          cx="100"
          cy="100"
          r="35"
          fill="#4285F4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="28"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="12"
          fill="#4285F4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />

        {/* Colored segments */}
        <motion.path
          d="M100 72 L100 88 L115 96 L125 78 A35 35 0 0 0 100 65"
          fill="#EA4335"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        />
        <motion.path
          d="M100 128 L100 112 L85 104 L75 122 A35 35 0 0 0 100 135"
          fill="#34A853"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        />
        <motion.path
          d="M68 85 L84 93 L84 107 L68 115 A35 35 0 0 1 68 85"
          fill="#FBBC05"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        />
      </motion.g>

      {/* Spinning gear - processing indicator */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "170px 45px" }}
      >
        <circle cx="170" cy="45" r="18" fill="#FFC93F" />
        <circle cx="170" cy="45" r="8" fill="#1A1A1A" />
        {/* Gear teeth */}
        <rect x="166" y="25" width="8" height="8" rx="1" fill="#FFC93F" />
        <rect x="166" y="57" width="8" height="8" rx="1" fill="#FFC93F" />
        <rect x="150" y="41" width="8" height="8" rx="1" fill="#FFC93F" />
        <rect x="182" y="41" width="8" height="8" rx="1" fill="#FFC93F" />
      </motion.g>

      {/* Processing dots */}
      <motion.circle
        cx="75"
        cy="170"
        r="5"
        fill="#F05335"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="100"
        cy="170"
        r="5"
        fill="#F05335"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.circle
        cx="125"
        cy="170"
        r="5"
        fill="#F05335"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />

      {/* Floating code snippet */}
      <motion.g
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="15" y="80" width="25" height="35" rx="4" fill="#2D2D2D" />
        <rect x="19" y="86" width="12" height="3" rx="1" fill="#F05335" />
        <rect x="19" y="92" width="17" height="3" rx="1" fill="#FFC93F" />
        <rect x="19" y="98" width="10" height="3" rx="1" fill="#48C76D" />
        <rect x="19" y="104" width="14" height="3" rx="1" fill="#64B5F6" />
      </motion.g>
    </svg>
  )
}
