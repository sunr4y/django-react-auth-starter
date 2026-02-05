import { motion } from "framer-motion"
import {
  PdfIcon,
  ScreenshotIcon,
  OgImageIcon,
  SpeedIcon,
  SecurityIcon,
  DeveloperIcon,
} from "@/components/illustrations/feature-icons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: PdfIcon,
    title: "PDF Generation",
    description:
      "Convert HTML or URLs to pixel-perfect PDFs. Full CSS3, custom fonts, and JavaScript support.",
    accent: "coral",
  },
  {
    icon: ScreenshotIcon,
    title: "Screenshots",
    description:
      "Capture full-page or viewport screenshots in PNG, JPEG, or WebP format.",
    accent: "yellow",
  },
  {
    icon: OgImageIcon,
    title: "OG Images",
    description:
      "Auto-generate Open Graph images for social sharing. Perfect for blogs and marketing.",
    accent: "blue",
  },
  {
    icon: SpeedIcon,
    title: "Fast Rendering",
    description:
      "Average conversion under 2 seconds. Optimized Chromium engine for speed.",
    accent: "green",
  },
  {
    icon: SecurityIcon,
    title: "Secure by Default",
    description:
      "No data storage. TLS encryption. GDPR and HIPAA compliance ready.",
    accent: "green",
  },
  {
    icon: DeveloperIcon,
    title: "Developer-First",
    description:
      "Simple REST API. SDKs for all major languages. Sandbox mode for testing.",
    accent: "coral",
  },
]

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<2s", label: "Avg Response" },
  { value: "50+", label: "API Endpoints" },
  { value: "24/7", label: "Support" },
]

export function Features() {
  return (
    <section id="features" className="py-24 border-t border-border-light">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="coral" className="mb-4 text-sm py-1.5">
            Features
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-lg text-text-secondary max-w-[520px] mx-auto">
            Powerful features to handle all your document generation needs
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative bg-white border-border-light rounded-2xl p-0 py-0 overflow-hidden hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-cream via-white to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  feature.accent === "coral"
                    ? "bg-coral"
                    : feature.accent === "green"
                      ? "bg-green"
                      : feature.accent === "yellow"
                        ? "bg-yellow"
                        : "bg-blue-500"
                }`}
              />

              {/* Content */}
              <CardContent className="relative z-10 p-6">
                {/* Icon */}
                <div className="w-16 h-16 mb-5">
                  <feature.icon className="w-full h-full" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-coral transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Arrow indicator on hover */}
                <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-4 h-4 text-coral"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border-light"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-coral mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
