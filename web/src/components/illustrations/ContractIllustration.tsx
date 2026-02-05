import { motion } from "framer-motion"

export function ContractIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 320" fill="none" className={className}>
      {/* Background decorative elements */}
      <motion.circle
        cx="45"
        cy="70"
        r="7"
        fill="#FFC93F"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.circle
        cx="365"
        cy="50"
        r="5"
        fill="#48C76D"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.circle
        cx="380"
        cy="270"
        r="6"
        fill="#F05335"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />

      {/* Main document */}
      <motion.g
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Document shadow */}
        <rect
          x="108"
          y="28"
          width="200"
          height="260"
          rx="8"
          fill="#1A1A1A"
          opacity="0.08"
        />

        {/* Document paper */}
        <rect
          x="100"
          y="20"
          width="200"
          height="260"
          rx="8"
          fill="white"
          stroke="#E5E5E5"
          strokeWidth="2"
        />
      </motion.g>

      {/* Document header - animated */}
      <motion.rect
        x="120"
        y="40"
        width="160"
        height="14"
        rx="4"
        fill="#1A1A1A"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 160, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Contract text lines - staggered animations */}
      <motion.rect
        x="120"
        y="70"
        width="140"
        height="6"
        rx="2"
        fill="#E8E8E8"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 140, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
      />
      <motion.rect
        x="120"
        y="85"
        width="120"
        height="6"
        rx="2"
        fill="#F0F0F0"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 120, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.4 }}
      />
      <motion.rect
        x="120"
        y="100"
        width="150"
        height="6"
        rx="2"
        fill="#F0F0F0"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 150, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4 }}
      />
      <motion.rect
        x="120"
        y="115"
        width="100"
        height="6"
        rx="2"
        fill="#F0F0F0"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 100, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45, duration: 0.4 }}
      />
      <motion.rect
        x="120"
        y="130"
        width="130"
        height="6"
        rx="2"
        fill="#F0F0F0"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 130, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
      <motion.rect
        x="120"
        y="145"
        width="110"
        height="6"
        rx="2"
        fill="#F0F0F0"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 110, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55, duration: 0.4 }}
      />

      {/* Signature section divider - animated */}
      <motion.line
        x1="120"
        y1="200"
        x2="280"
        y2="200"
        stroke="#E5E5E5"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />

      {/* Signature line - animated */}
      <motion.line
        x1="120"
        y1="230"
        x2="200"
        y2="230"
        stroke="#CCC"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />

      {/* Signature label - animated */}
      <motion.text
        x="160"
        y="245"
        textAnchor="middle"
        fill="#999"
        fontSize="8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.75 }}
      >
        Signature
      </motion.text>

      {/* Animated signature scribble */}
      <motion.path
        d="M125 222 C135 210, 145 230, 155 218 S170 235, 185 220 S195 230, 195 225"
        stroke="#F05335"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 1, ease: "easeInOut" }}
      />

      {/* Date box - animated */}
      <motion.rect
        x="220"
        y="220"
        width="60"
        height="8"
        rx="2"
        fill="#E8E8E8"
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.8 }}
      />

      {/* Animated pen */}
      <motion.g
        initial={{ x: 50, y: -30, rotate: -20, opacity: 0 }}
        whileInView={{ x: 0, y: 0, rotate: 35, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
      >
        <g transform="translate(280, 180) rotate(35)">
          {/* Pen body */}
          <rect x="0" y="0" width="12" height="70" rx="3" fill="#1A1A1A" />
          {/* Pen cap */}
          <rect x="0" y="0" width="12" height="18" rx="3" fill="#FFC93F" />
          {/* Pen tip */}
          <polygon points="6,70 0,85 12,85" fill="#1A1A1A" />
          {/* Pen clip */}
          <rect x="10" y="5" width="3" height="25" rx="1" fill="#E5B636" />
        </g>
      </motion.g>

      {/* Checkmark badge - approved */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.4,
          type: "spring",
          stiffness: 200,
        }}
      >
        <motion.g
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="320" cy="70" r="28" fill="#48C76D" />
        </motion.g>
      </motion.g>

      {/* Checkmark path - animated separately */}
      <motion.path
        d="M306 70 L314 78 L334 58"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
      />

      {/* Floating document - secondary */}
      <motion.g
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.g
          animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect
            x="30"
            y="100"
            width="55"
            height="70"
            rx="4"
            fill="white"
            stroke="#F05335"
            strokeWidth="2"
          />
          <motion.rect
            x="38"
            y="112"
            width="38"
            height="4"
            rx="1"
            fill="#E8E8E8"
            initial={{ width: 0 }}
            whileInView={{ width: 38 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
          <motion.rect
            x="38"
            y="122"
            width="30"
            height="4"
            rx="1"
            fill="#F0F0F0"
            initial={{ width: 0 }}
            whileInView={{ width: 30 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.3 }}
          />
          <motion.rect
            x="38"
            y="132"
            width="35"
            height="4"
            rx="1"
            fill="#F0F0F0"
            initial={{ width: 0 }}
            whileInView={{ width: 35 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.3 }}
          />
          <motion.rect
            x="38"
            y="142"
            width="25"
            height="4"
            rx="1"
            fill="#F0F0F0"
            initial={{ width: 0 }}
            whileInView={{ width: 25 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.3 }}
          />
          <circle cx="75" cy="108" r="6" fill="#F05335" opacity="0.2" />
        </motion.g>
      </motion.g>

      {/* Stamp effect - circles */}
      <motion.g
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        whileInView={{ scale: 1, rotate: -15, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 1.2,
          duration: 0.4,
          type: "spring",
          stiffness: 200,
        }}
      >
        <circle
          cx="260"
          cy="160"
          r="22"
          fill="none"
          stroke="#48C76D"
          strokeWidth="3"
          opacity="0.8"
        />
        <circle
          cx="260"
          cy="160"
          r="17"
          fill="none"
          stroke="#48C76D"
          strokeWidth="1"
          opacity="0.6"
        />
      </motion.g>

      {/* APPROVED text - animated separately */}
      <motion.text
        x="260"
        y="164"
        textAnchor="middle"
        fill="#48C76D"
        fontSize="10"
        fontWeight="bold"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: 1.4,
          duration: 0.3,
          type: "spring",
          stiffness: 200,
        }}
        style={{ transformOrigin: "260px 160px" }}
      >
        APPROVED
      </motion.text>

      {/* Small decorative elements */}
      <motion.rect
        x="355"
        y="140"
        width="15"
        height="15"
        rx="3"
        fill="#FFC93F"
        initial={{ opacity: 0, rotate: -20 }}
        whileInView={{ opacity: 0.3, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      />
    </svg>
  )
}
