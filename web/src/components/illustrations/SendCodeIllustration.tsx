import { motion } from "framer-motion"

export function SendCodeIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Code editor window */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Window frame */}
        <rect x="20" y="30" width="130" height="140" rx="8" fill="#2D2D2D" />

        {/* Window header */}
        <rect x="20" y="30" width="130" height="24" rx="8" fill="#3D3D3D" />
        <circle cx="34" cy="42" r="5" fill="#FF5F57" />
        <circle cx="50" cy="42" r="5" fill="#FFBD2E" />
        <circle cx="66" cy="42" r="5" fill="#28CA42" />

        {/* Code lines - animated */}
        <motion.rect
          x="32"
          y="66"
          width="50"
          height="6"
          rx="2"
          fill="#F05335"
          initial={{ width: 0 }}
          animate={{ width: 50 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
        <motion.rect
          x="32"
          y="80"
          width="80"
          height="6"
          rx="2"
          fill="#FFC93F"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
        <motion.rect
          x="32"
          y="94"
          width="60"
          height="6"
          rx="2"
          fill="#48C76D"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        />
        <motion.rect
          x="32"
          y="108"
          width="90"
          height="6"
          rx="2"
          fill="#64B5F6"
          initial={{ width: 0 }}
          animate={{ width: 90 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        />
        <motion.rect
          x="32"
          y="122"
          width="45"
          height="6"
          rx="2"
          fill="#F05335"
          initial={{ width: 0 }}
          animate={{ width: 45 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        />
        <motion.rect
          x="32"
          y="136"
          width="70"
          height="6"
          rx="2"
          fill="#FFC93F"
          initial={{ width: 0 }}
          animate={{ width: 70 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        />
      </motion.g>

      {/* Animated send arrow */}
      <motion.g
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="170" cy="100" r="22" fill="#F05335" />
        <path
          d="M160 100 L175 100 M170 93 L178 100 L170 107"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Flying code particles */}
      <motion.rect
        x="155"
        y="60"
        width="12"
        height="6"
        rx="2"
        fill="#FFC93F"
        opacity="0.8"
        animate={{ x: [0, 20, 0], y: [0, -5, 0], opacity: [0.8, 0.4, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.rect
        x="160"
        y="130"
        width="10"
        height="5"
        rx="2"
        fill="#48C76D"
        opacity="0.7"
        animate={{ x: [0, 15, 0], y: [0, 5, 0], opacity: [0.7, 0.3, 0.7] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
    </svg>
  )
}
