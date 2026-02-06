import { Sparkles, Github } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { CodeSnippet } from "./CodeSnippet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="pt-40 pb-24 text-center">
      <div className="container-custom">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Badge variant="yellow">
            <Sparkles className="w-4 h-4" />
            Open Source &bull; Production Ready
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[clamp(40px,6vw,64px)] font-bold tracking-tight leading-[1.1] max-w-[800px] mx-auto mb-6"
        >
          Ship Authentication in Minutes, Not Days
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-text-secondary leading-relaxed max-w-[560px] mx-auto mb-10"
        >
          A complete Django + React authentication starter with JWT, email
          verification, password reset, and more. Stop rebuilding auth from
          scratch.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <Button asChild>
            <Link to="/signup">Get Started Free</Link>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://github.com/maniishbhusal/django-react-auth-starter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
        </motion.div>

        {/* Tech Stack Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {["Django 5", "React 19", "TypeScript", "JWT", "PostgreSQL"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-dark/5 text-text-secondary rounded-full"
              >
                {tech}
              </span>
            )
          )}
        </motion.div>

        {/* Interactive Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CodeSnippet />
        </motion.div>
      </div>
    </section>
  )
}
