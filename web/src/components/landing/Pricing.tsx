import { Check, Github, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const features = [
  "Full source code access",
  "MIT licensed",
  "Commercial use allowed",
  "No attribution required",
  "Community support",
  "Regular updates",
]

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
            Completely Free & Open Source
          </h2>
          <p className="text-lg text-text-secondary max-w-[480px] mx-auto">
            No pricing tiers. No hidden costs. Just clone, customize, and ship.
          </p>
        </motion.div>

        {/* Single Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-[480px] mx-auto"
        >
          <Card className="bg-dark text-text-muted border-dark rounded-2xl p-0 py-0 overflow-hidden">
            {/* Accent line */}
            <div className="h-1 bg-linear-to-r from-coral via-yellow to-green" />

            <CardContent className="p-8">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-6xl font-bold tracking-tight">$0</span>
                  <span className="text-xl text-gray">/forever</span>
                </div>
                <p className="text-gray">
                  Everything you need to build production-ready auth
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green" />
                    </div>
                    <span className="text-[15px]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="default"
                  className="flex-1 bg-coral hover:bg-coral/90"
                  asChild
                >
                  <a
                    href="https://github.com/maniishbhusal/django-react-auth-starter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Star on GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-border-soft text-white hover:bg-dark-lighter hover:text-white"
                  asChild
                >
                  <a
                    href="https://github.com/maniishbhusal/django-react-auth-starter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Source
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-text-secondary mt-8"
        >
          Found this helpful? Consider giving us a star on GitHub!
        </motion.p>
      </div>
    </section>
  )
}
