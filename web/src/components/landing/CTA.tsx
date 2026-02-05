import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 bg-yellow">
      <div className="container-custom text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-[40px] font-bold tracking-tight text-text-primary mb-4"
        >
          Ready to ship your next project?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-text-secondary max-w-[480px] mx-auto mb-8"
        >
          Clone the repo and have authentication running in under 5 minutes.
          It's that simple.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="secondary" asChild>
            <a
              href="https://github.com/maniishbhusal/django-react-auth-starter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              Get Started
            </a>
          </Button>
          <Button variant="outline" className="hover:bg-white/50" asChild>
            <a
              href="https://github.com/maniishbhusal/django-react-auth-starter#readme"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the Docs
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
