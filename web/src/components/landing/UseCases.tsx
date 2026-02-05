import { motion } from "framer-motion"
import {
  InvoiceIllustration,
  ReportsIllustration,
  CertificateIllustration,
  ContractIllustration,
} from "@/components/illustrations"

const useCases = [
  {
    illustration: InvoiceIllustration,
    title: "Invoice Generation",
    description:
      "Automatically generate professional invoices from your billing system. Perfect for e-commerce and SaaS platforms that need reliable, pixel-perfect PDF invoices.",
    features: [
      "Custom templates",
      "Dynamic data binding",
      "Multi-currency support",
    ],
  },
  {
    illustration: ReportsIllustration,
    title: "Reports & Analytics",
    description:
      "Export dashboards and charts to PDF. Render JavaScript-based visualizations from Chart.js, D3, or Plotly with full fidelity.",
    features: ["Chart rendering", "Dashboard exports", "Scheduled reports"],
  },
  {
    illustration: CertificateIllustration,
    title: "Certificates",
    description:
      "Issue personalized course completion certificates, awards, and credentials. Support for custom fonts, designs, and batch generation.",
    features: ["Custom fonts", "Batch generation", "QR verification"],
  },
  {
    illustration: ContractIllustration,
    title: "Contracts & Legal Docs",
    description:
      "Generate contracts, agreements, and offer letters dynamically from templates. Perfect for HR, legal, and sales teams.",
    features: ["Template engine", "E-signature ready", "Version control"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

// Text content animation variants
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
}

const descriptionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
}

const featureVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as const },
  },
}

export function UseCases() {
  return (
    <section className="py-24 border-t border-border-light">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Built for real-world use cases
          </h2>
          <p className="text-lg text-text-secondary max-w-[560px] mx-auto">
            Trusted by developers building invoices, reports, certificates, and
            more
          </p>
        </motion.div>

        {/* Alternating sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24"
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              variants={itemVariants}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse lg:gap-12" : "lg:gap-20"
              }`}
            >
              {/* Illustration */}
              <motion.div
                className="flex-1 w-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <useCase.illustration className="w-full h-auto max-w-[450px]" />
              </motion.div>

              {/* Content */}
              <motion.div
                className="flex-1 w-full"
                variants={textContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h3
                  className="text-2xl lg:text-3xl font-bold mb-4"
                  variants={titleVariants}
                >
                  {useCase.title}
                </motion.h3>
                <motion.p
                  className="text-text-secondary leading-relaxed mb-6"
                  variants={descriptionVariants}
                >
                  {useCase.description}
                </motion.p>
                <motion.ul className="space-y-3">
                  {useCase.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      className="flex items-center gap-3"
                      variants={featureVariants}
                      custom={featureIndex}
                    >
                      <motion.span
                        className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center shrink-0"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.4 + featureIndex * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <svg
                          className="w-3 h-3 text-green"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.span>
                      <span className="text-sm text-text-secondary">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
