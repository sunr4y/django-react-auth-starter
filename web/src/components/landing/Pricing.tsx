import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    description: "For developers testing",
    features: [
      "100 credits/month",
      "All API endpoints",
      "2MB file limit",
      "30 second timeout",
      "Community support",
    ],
    overage: null,
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Starter",
    price: "$9",
    period: "/mo",
    description: "For side projects",
    features: [
      "500 credits/month",
      "5MB file limit",
      "45 second timeout",
      "Email support",
    ],
    overage: "$0.02/credit",
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For small businesses",
    features: [
      "3,000 credits/month",
      "10MB file limit",
      "60 second timeout",
      "Template storage",
      "Priority support",
    ],
    overage: "$0.015/credit",
    cta: "Start Free Trial",
    featured: true,
  },
  {
    name: "Business",
    price: "$79",
    period: "/mo",
    description: "For growing apps",
    features: [
      "10,000 credits/month",
      "25MB file limit",
      "Parallel conversion",
      "S3 integration",
      "Dedicated support",
    ],
    overage: "$0.01/credit",
    cta: "Get Started",
    featured: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t border-border-light">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-text-secondary">
            Start free. Scale as you grow. No surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={plan.featured ? {} : { y: -5 }}
            >
              <Card
                className={`h-full rounded-xl p-0 py-0 text-center ${
                  plan.featured
                    ? "bg-dark text-text-muted scale-105 border-dark"
                    : "bg-white border-border-light"
                }`}
              >
                <CardContent className="p-6">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      plan.featured ? "text-yellow" : ""
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    <span
                      className={`text-base font-normal ${
                        plan.featured ? "text-gray" : "text-text-secondary"
                      }`}
                    >
                      /mo
                    </span>
                  </div>
                  <p
                    className={`text-sm mb-6 ${
                      plan.featured ? "text-gray" : "text-text-secondary"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <ul className="text-left mb-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm"
                      >
                        <Check className="w-[18px] h-[18px] text-green shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`text-xs mb-6 h-4 ${
                      plan.featured ? "text-gray" : "text-text-secondary"
                    }`}
                  >
                    {plan.overage ? `Overage: ${plan.overage}` : ""}
                  </p>
                  <Button
                    variant={plan.featured ? "default" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link to="/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary mb-4">
            Need unlimited conversions or custom requirements?
          </p>
          <Button variant="link" asChild>
            <Link to="/contact">Contact us for Enterprise pricing →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
