import { motion } from "framer-motion"

export function OutputIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className}>
      {/* Main PDF document */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Document shadow */}
        <rect x="55" y="35" width="90" height="120" rx="6" fill="#E5E5E5" />

        {/* Main document */}
        <rect
          x="50"
          y="30"
          width="90"
          height="120"
          rx="6"
          fill="white"
          stroke="#E5E5E5"
          strokeWidth="1"
        />

        {/* PDF badge */}
        <motion.rect
          x="105"
          y="25"
          width="35"
          height="18"
          rx="4"
          fill="#F05335"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        />
        <text
          x="122"
          y="37"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontWeight="bold"
        >
          PDF
        </text>

        {/* Document content lines */}
        <motion.rect
          x="60"
          y="50"
          width="50"
          height="6"
          rx="2"
          fill="#1A1A1A"
          initial={{ width: 0 }}
          animate={{ width: 50 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        />
        <motion.rect
          x="60"
          y="62"
          width="70"
          height="4"
          rx="2"
          fill="#E8E8E8"
          initial={{ width: 0 }}
          animate={{ width: 70 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
        <motion.rect
          x="60"
          y="72"
          width="65"
          height="4"
          rx="2"
          fill="#E8E8E8"
          initial={{ width: 0 }}
          animate={{ width: 65 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        />
        <motion.rect
          x="60"
          y="82"
          width="55"
          height="4"
          rx="2"
          fill="#E8E8E8"
          initial={{ width: 0 }}
          animate={{ width: 55 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        />

        {/* Chart in document */}
        <motion.rect
          x="60"
          y="95"
          width="15"
          height="25"
          rx="2"
          fill="#48C76D"
          initial={{ height: 0, y: 120 }}
          animate={{ height: 25, y: 95 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
        <motion.rect
          x="80"
          y="105"
          width="15"
          height="15"
          rx="2"
          fill="#FFC93F"
          initial={{ height: 0, y: 120 }}
          animate={{ height: 15, y: 105 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        />
        <motion.rect
          x="100"
          y="100"
          width="15"
          height="20"
          rx="2"
          fill="#F05335"
          initial={{ height: 0, y: 120 }}
          animate={{ height: 20, y: 100 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        />
      </motion.g>

      {/* Success checkmark circle */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      >
        <circle cx="155" cy="115" r="22" fill="#48C76D" />
        <motion.path
          d="M145 115 L152 122 L167 107"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        />
      </motion.g>

      {/* Download arrow */}
      <motion.g
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="95" cy="170" r="18" fill="#1A1A1A" />
        <path
          d="M95 162 L95 175 M88 170 L95 178 L102 170"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>

      {/* Floating format badges */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="15" y="60" width="28" height="16" rx="4" fill="#4285F4" />
        <text
          x="29"
          y="71"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="bold"
        >
          PNG
        </text>
      </motion.g>

      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <rect x="15" y="85" width="28" height="16" rx="4" fill="#FFC93F" />
        <text
          x="29"
          y="96"
          textAnchor="middle"
          fill="#1A1A1A"
          fontSize="7"
          fontWeight="bold"
        >
          JPG
        </text>
      </motion.g>

      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <rect x="15" y="110" width="28" height="16" rx="4" fill="#48C76D" />
        <text
          x="29"
          y="121"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="bold"
        >
          WebP
        </text>
      </motion.g>

      {/* Sparkles */}
      <motion.path
        d="M170 50 L172 55 L177 57 L172 59 L170 64 L168 59 L163 57 L168 55 Z"
        fill="#FFC93F"
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.path
        d="M30 150 L31 153 L34 154 L31 155 L30 158 L29 155 L26 154 L29 153 Z"
        fill="#F05335"
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  )
}
