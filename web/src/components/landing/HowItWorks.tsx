import { motion } from "framer-motion"
import { Terminal, Settings, Rocket } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Clone the Repository",
    description:
      "Get started with a single command. Works with npm, pnpm, or yarn. Full TypeScript support out of the box.",
    icon: Terminal,
    color: "coral",
  },
  {
    number: 2,
    title: "Configure Your App",
    description:
      "Set your environment variables, customize email templates, and add your branding. Everything is well-documented.",
    icon: Settings,
    color: "yellow",
  },
  {
    number: 3,
    title: "Deploy & Go Live",
    description:
      "Deploy to Railway, Render, Vercel, or any platform. Production-ready with security best practices built in.",
    icon: Rocket,
    color: "green",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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

export function HowItWorks() {
  return (
    <section className="py-24 bg-dark overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold tracking-tight text-text-muted mb-4">
            Get started in minutes
          </h2>
          <p className="text-lg text-gray max-w-[520px] mx-auto">
            From clone to production in three simple steps
          </p>
        </motion.div>

        {/* Steps with icons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Connection line - desktop only */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-coral/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative"
              >
                {/* Step card */}
                <div className="bg-dark-lighter rounded-2xl p-6 border border-border-soft hover:border-coral/30 transition-colors">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-24 h-24 rounded-2xl flex items-center justify-center ${
                        step.color === "coral"
                          ? "bg-coral/10"
                          : step.color === "yellow"
                            ? "bg-yellow/10"
                            : "bg-green/10"
                      }`}
                    >
                      <step.icon
                        className={`w-12 h-12 ${
                          step.color === "coral"
                            ? "text-coral"
                            : step.color === "yellow"
                              ? "text-yellow"
                              : "text-green"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Step number badge */}
                  <div className="flex items-center justify-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.15,
                      }}
                      className="w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center text-lg font-bold"
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-text-muted mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-gray leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector - mobile/tablet */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="flex justify-center my-4 lg:hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-coral"
                    >
                      <path
                        d="M12 5L12 19M12 19L19 12M12 19L5 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Arrow connector - desktop */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    <div className="w-6 h-6 bg-coral rounded-full flex items-center justify-center">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
