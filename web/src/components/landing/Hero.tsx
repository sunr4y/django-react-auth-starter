import { Zap } from "lucide-react"
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
            <Zap className="w-4 h-4" />
            Fast, Reliable, Developer-First
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[clamp(40px,6vw,64px)] font-bold tracking-tight leading-[1.1] max-w-[800px] mx-auto mb-6"
        >
          The Lightweight PDF API for Modern Developers
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-text-secondary leading-relaxed max-w-[560px] mx-auto mb-10"
        >
          Convert HTML to pixel-perfect PDFs, screenshots, and OG images with a
          single API call. No headless browsers to manage. No infrastructure
          headaches.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Button asChild>
            <Link to="/signup">Start Free - 100 credits/month</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="#docs">View Documentation</a>
          </Button>
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
