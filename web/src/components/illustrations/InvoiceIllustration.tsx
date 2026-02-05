import { motion } from "framer-motion"

export function InvoiceIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 320" fill="none" className={className}>
      {/* Background elements */}
      <motion.circle
        cx="50"
        cy="60"
        r="8"
        fill="#FFC93F"
        opacity="0.4"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.circle
        cx="370"
        cy="100"
        r="6"
        fill="#F05335"
        opacity="0.3"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.circle
        cx="40"
        cy="250"
        r="5"
        fill="#48C76D"
        opacity="0.4"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />

      {/* Floating dollar coin - left */}
      <motion.g
        initial={{ y: 30, opacity: 0, scale: 0.8 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.g
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="70" cy="100" r="32" fill="#48C76D" />
          <circle cx="70" cy="100" r="26" fill="#3AB05E" />
          <text
            x="70"
            y="110"
            textAnchor="middle"
            fill="white"
            fontSize="28"
            fontWeight="bold"
          >
            $
          </text>
        </motion.g>
      </motion.g>

      {/* Floating dollar coin - right */}
      <motion.g
        initial={{ y: 30, opacity: 0, scale: 0.8 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.g
          animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          <circle cx="340" cy="140" r="24" fill="#FFC93F" />
          <circle cx="340" cy="140" r="19" fill="#E5B636" />
          <text
            x="340"
            y="148"
            textAnchor="middle"
            fill="#1A1A1A"
            fontSize="20"
            fontWeight="bold"
          >
            $
          </text>
        </motion.g>
      </motion.g>

      {/* Main invoice document */}
      <motion.g
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Document shadow */}
        <rect
          x="118"
          y="38"
          width="180"
          height="240"
          rx="8"
          fill="#1A1A1A"
          opacity="0.08"
        />

        {/* Document */}
        <rect
          x="110"
          y="30"
          width="180"
          height="240"
          rx="8"
          fill="white"
          stroke="#E5E5E5"
          strokeWidth="2"
        />

        {/* Header */}
        <rect x="110" y="30" width="180" height="50" rx="8" fill="#F05335" />
        <rect x="110" y="70" width="180" height="10" fill="#F05335" />
      </motion.g>

      {/* Invoice text - animated separately */}
      <motion.text
        x="200"
        y="62"
        textAnchor="middle"
        fill="white"
        fontSize="20"
        fontWeight="bold"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        INVOICE
      </motion.text>

      {/* Invoice number - animated */}
      <motion.text
        x="130"
        y="100"
        fill="#999"
        fontSize="10"
        initial={{ opacity: 0, x: -15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        #INV-2024-001
      </motion.text>

      {/* Date - animated */}
      <motion.text
        x="260"
        y="100"
        textAnchor="end"
        fill="#1A1A1A"
        fontSize="10"
        fontWeight="500"
        initial={{ opacity: 0, x: 15 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        Dec 01, 2024
      </motion.text>

      {/* Divider - animated */}
      <motion.line
        x1="130"
        y1="115"
        x2="270"
        y2="115"
        stroke="#E5E5E5"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.45 }}
      />

      {/* Line items - staggered */}
      <motion.g
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <rect x="130" y="125" width="90" height="8" rx="3" fill="#E8E8E8" />
        <rect x="240" y="125" width="30" height="8" rx="3" fill="#E8E8E8" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        <rect x="130" y="145" width="70" height="8" rx="3" fill="#F0F0F0" />
        <rect x="240" y="145" width="30" height="8" rx="3" fill="#F0F0F0" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <rect x="130" y="165" width="85" height="8" rx="3" fill="#F0F0F0" />
        <rect x="240" y="165" width="30" height="8" rx="3" fill="#F0F0F0" />
      </motion.g>

      <motion.g
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <rect x="130" y="185" width="60" height="8" rx="3" fill="#F0F0F0" />
        <rect x="240" y="185" width="30" height="8" rx="3" fill="#F0F0F0" />
      </motion.g>

      {/* Total section divider */}
      <motion.line
        x1="130"
        y1="210"
        x2="270"
        y2="210"
        stroke="#1A1A1A"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />

      {/* Total label - animated */}
      <motion.text
        x="130"
        y="235"
        fill="#1A1A1A"
        fontSize="12"
        fontWeight="600"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.75 }}
      >
        Total
      </motion.text>

      {/* Total amount - animated with scale pop */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.8,
          type: "spring",
          stiffness: 200,
        }}
      >
        <motion.g
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="200" y="220" width="70" height="24" rx="4" fill="#FFC93F" />
          <text
            x="235"
            y="237"
            textAnchor="middle"
            fill="#1A1A1A"
            fontSize="14"
            fontWeight="bold"
          >
            $1,234
          </text>
        </motion.g>
      </motion.g>

      {/* Floating checkmark badge */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.9,
          type: "spring",
          stiffness: 200,
        }}
      >
        <motion.g
          animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle cx="310" cy="70" r="22" fill="#48C76D" />
          <path
            d="M300 70l6 6 14-14"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>
      </motion.g>

      {/* Small floating elements */}
      <motion.rect
        x="355"
        y="220"
        width="20"
        height="20"
        rx="4"
        fill="#F05335"
        opacity="0.2"
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 0.2, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      />
    </svg>
  )
}
