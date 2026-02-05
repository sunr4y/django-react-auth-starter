import { motion } from "framer-motion"

export function CertificateIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 320" fill="none" className={className}>
      {/* Background decorative elements */}
      <motion.circle
        cx="40"
        cy="60"
        r="6"
        fill="#F05335"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.circle
        cx="370"
        cy="80"
        r="8"
        fill="#48C76D"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.circle
        cx="50"
        cy="260"
        r="5"
        fill="#FFC93F"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.1 }}
      />
      <motion.circle
        cx="365"
        cy="240"
        r="4"
        fill="#F05335"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />

      {/* Main certificate */}
      <motion.g
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Certificate shadow */}
        <rect
          x="68"
          y="38"
          width="280"
          height="190"
          rx="8"
          fill="#1A1A1A"
          opacity="0.08"
        />

        {/* Certificate paper */}
        <rect
          x="60"
          y="30"
          width="280"
          height="190"
          rx="8"
          fill="white"
          stroke="#E5E5E5"
          strokeWidth="2"
        />
      </motion.g>

      {/* Decorative border - animated */}
      <motion.rect
        x="72"
        y="42"
        width="256"
        height="166"
        rx="4"
        fill="none"
        stroke="#FFC93F"
        strokeWidth="2"
        strokeDasharray="6 3"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Header text placeholder */}
      <motion.rect
        x="130"
        y="55"
        width="140"
        height="10"
        rx="3"
        fill="#E8E8E8"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 140, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Certificate text - animated */}
      <motion.text
        x="200"
        y="90"
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize="16"
        fontWeight="bold"
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        CERTIFICATE
      </motion.text>

      {/* OF ACHIEVEMENT - animated separately */}
      <motion.text
        x="200"
        y="108"
        textAnchor="middle"
        fill="#666"
        fontSize="10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        OF ACHIEVEMENT
      </motion.text>

      {/* Recipient name placeholder - animated */}
      <motion.rect
        x="110"
        y="125"
        width="180"
        height="14"
        rx="4"
        fill="#1A1A1A"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 180, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.55 }}
      />

      {/* Description lines - staggered */}
      <motion.rect
        x="100"
        y="150"
        width="200"
        height="6"
        rx="2"
        fill="#F0F0F0"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 200, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
      <motion.rect
        x="120"
        y="162"
        width="160"
        height="6"
        rx="2"
        fill="#F0F0F0"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 160, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.65 }}
      />

      {/* Date and signature lines - animated */}
      <motion.line
        x1="80"
        y1="185"
        x2="140"
        y2="185"
        stroke="#CCC"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />
      <motion.line
        x1="260"
        y1="185"
        x2="320"
        y2="185"
        stroke="#CCC"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />
      <motion.rect
        x="80"
        y="190"
        width="60"
        height="4"
        rx="1"
        fill="#E8E8E8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.75 }}
      />
      <motion.rect
        x="260"
        y="190"
        width="60"
        height="4"
        rx="1"
        fill="#E8E8E8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.75 }}
      />

      {/* Animated medal */}
      <motion.g
        initial={{ scale: 0, y: 30 }}
        whileInView={{ scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          type: "spring",
          stiffness: 150,
        }}
      >
        <motion.g
          animate={{ y: [0, -6, 0], rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Ribbon */}
          <path
            d="M175 225 L200 260 L185 260 L175 280 L165 260 L150 260 L175 225"
            fill="#F05335"
          />
          <path
            d="M225 225 L200 260 L215 260 L225 280 L235 260 L250 260 L225 225"
            fill="#F05335"
          />

          {/* Medal circle outer */}
          <circle
            cx="200"
            cy="235"
            r="35"
            fill="#FFC93F"
            stroke="#E5B636"
            strokeWidth="3"
          />

          {/* Medal circle inner */}
          <circle cx="200" cy="235" r="26" fill="white" />
        </motion.g>
      </motion.g>

      {/* Star in medal - animated separately */}
      <motion.path
        d="M200 215 L204 227 L217 227 L207 235 L211 247 L200 240 L189 247 L193 235 L183 227 L196 227 Z"
        fill="#FFC93F"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        style={{ transformOrigin: "200px 235px" }}
      />

      {/* Floating star - left */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.g
          animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon
            points="70,100 74,112 87,112 77,120 81,132 70,124 59,132 63,120 53,112 66,112"
            fill="#FFC93F"
          />
        </motion.g>
      </motion.g>

      {/* Floating star - right */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <motion.g
          animate={{ y: [0, -8, 0], rotate: [0, -15, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <polygon
            points="340,110 343,119 353,119 345,125 348,134 340,128 332,134 335,125 327,119 337,119"
            fill="#FFC93F"
          />
        </motion.g>
      </motion.g>

      {/* Confetti particles - staggered entrance */}
      <motion.rect
        x="90"
        y="40"
        width="8"
        height="8"
        rx="2"
        fill="#48C76D"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 0.6, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.9 }}
      />
      <motion.rect
        x="310"
        y="50"
        width="6"
        height="6"
        rx="1"
        fill="#F05335"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 0.5, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1 }}
      />
      <motion.circle
        cx="350"
        cy="170"
        r="4"
        fill="#FFC93F"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.1 }}
      />
    </svg>
  )
}
