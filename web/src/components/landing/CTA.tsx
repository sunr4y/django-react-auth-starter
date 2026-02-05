import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

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
          Ready to generate your first PDF?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-text-secondary max-w-[480px] mx-auto mb-8"
        >
          Start with 100 free credits. No credit card required. Set up in under
          5 minutes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="secondary" asChild>
            <Link to="/signup">Get Started Free</Link>
          </Button>
          <Button variant="outline" className="hover:bg-white/50" asChild>
            <a href="#docs">Read the Docs</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
