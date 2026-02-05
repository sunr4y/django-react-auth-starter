import { motion } from "framer-motion"

export function ReportsIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 320" fill="none" className={className}>
      {/* Background decorative elements */}
      <motion.circle
        cx="45"
        cy="80"
        r="6"
        fill="#FFC93F"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.circle
        cx="365"
        cy="60"
        r="8"
        fill="#48C76D"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.circle
        cx="380"
        cy="250"
        r="5"
        fill="#F05335"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />

      {/* Monitor shadow */}
      <motion.ellipse
        cx="200"
        cy="295"
        rx="100"
        ry="12"
        fill="#1A1A1A"
        initial={{ opacity: 0, scaleX: 0.5 }}
        whileInView={{ opacity: 0.1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Monitor */}
      <motion.g
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Monitor body */}
        <rect x="60" y="40" width="280" height="180" rx="12" fill="#1A1A1A" />
        <rect x="70" y="50" width="260" height="155" rx="6" fill="white" />

        {/* Monitor stand */}
        <rect x="170" y="220" width="60" height="30" fill="#1A1A1A" />
        <rect x="140" y="248" width="120" height="14" rx="4" fill="#1A1A1A" />

        {/* Chart area background */}
        <rect x="85" y="85" width="230" height="110" rx="4" fill="#FAFAFA" />
      </motion.g>

      {/* Screen header - animated */}
      <motion.rect
        x="85"
        y="62"
        width="100"
        height="10"
        rx="3"
        fill="#E8E8E8"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 100, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.circle
        cx="310"
        cy="67"
        r="5"
        fill="#48C76D"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
          delay: 0.3,
          type: "spring",
          stiffness: 200,
        }}
      />

      {/* Animated chart bars - whileInView */}
      <motion.rect
        x="105"
        y="155"
        width="30"
        height="30"
        rx="4"
        fill="#F05335"
        initial={{ height: 0, y: 185 }}
        whileInView={{ height: 30, y: 155 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <motion.rect
        x="150"
        y="125"
        width="30"
        height="60"
        rx="4"
        fill="#FFC93F"
        initial={{ height: 0, y: 185 }}
        whileInView={{ height: 60, y: 125 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.rect
        x="195"
        y="100"
        width="30"
        height="85"
        rx="4"
        fill="#48C76D"
        initial={{ height: 0, y: 185 }}
        whileInView={{ height: 85, y: 100 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <motion.rect
        x="240"
        y="115"
        width="30"
        height="70"
        rx="4"
        fill="#F05335"
        initial={{ height: 0, y: 185 }}
        whileInView={{ height: 70, y: 115 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <motion.rect
        x="285"
        y="135"
        width="30"
        height="50"
        rx="4"
        fill="#FFC93F"
        initial={{ height: 0, y: 185 }}
        whileInView={{ height: 50, y: 135 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />

      {/* Trend line */}
      <motion.path
        d="M120 150 L165 130 L210 95 L255 108 L300 90"
        stroke="#1A1A1A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Data points on line */}
      <motion.circle
        cx="120"
        cy="150"
        r="5"
        fill="#1A1A1A"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
      />
      <motion.circle
        cx="165"
        cy="130"
        r="5"
        fill="#1A1A1A"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
      />
      <motion.circle
        cx="210"
        cy="95"
        r="5"
        fill="#1A1A1A"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
      />
      <motion.circle
        cx="255"
        cy="108"
        r="5"
        fill="#1A1A1A"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, type: "spring", stiffness: 200 }}
      />
      <motion.circle
        cx="300"
        cy="90"
        r="5"
        fill="#1A1A1A"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
      />

      {/* Floating analytics card - left */}
      <motion.g
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect
            x="20"
            y="120"
            width="50"
            height="50"
            rx="8"
            fill="white"
            stroke="#E5E5E5"
            strokeWidth="1"
          />
          <motion.path
            d="M32 155 L38 145 L45 150 L55 135"
            stroke="#48C76D"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.g>
      </motion.g>

      {/* +24% text - animated separately */}
      <motion.text
        x="45"
        y="165"
        textAnchor="middle"
        fill="#48C76D"
        fontSize="8"
        fontWeight="bold"
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
        +24%
      </motion.text>

      {/* Floating analytics card - right */}
      <motion.g
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <rect x="340" y="140" width="45" height="45" rx="8" fill="#F05335" />
          <motion.rect
            x="350"
            y="165"
            width="6"
            height="12"
            rx="2"
            fill="white"
            initial={{ height: 0, y: 177 }}
            whileInView={{ height: 12, y: 165 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 }}
          />
          <motion.rect
            x="360"
            y="158"
            width="6"
            height="19"
            rx="2"
            fill="white"
            initial={{ height: 0, y: 177 }}
            whileInView={{ height: 19, y: 158 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />
          <motion.rect
            x="370"
            y="162"
            width="6"
            height="15"
            rx="2"
            fill="white"
            initial={{ height: 0, y: 177 }}
            whileInView={{ height: 15, y: 162 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.9 }}
          />
        </motion.g>
      </motion.g>

      {/* Percentage indicator */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.6,
          type: "spring",
          stiffness: 200,
        }}
      >
        <motion.g
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="355" cy="100" r="20" fill="#FFC93F" />
        </motion.g>
      </motion.g>

      {/* 87% text - animated separately */}
      <motion.text
        x="355"
        y="105"
        textAnchor="middle"
        fill="#1A1A1A"
        fontSize="12"
        fontWeight="bold"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          delay: 0.8,
          type: "spring",
          stiffness: 200,
        }}
      >
        87%
      </motion.text>
    </svg>
  )
}
