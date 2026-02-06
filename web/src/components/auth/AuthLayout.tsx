import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Navbar } from "@/components/landing/Navbar"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  subtitle2?: string
}

export function AuthLayout({
  children,
  title,
  subtitle,
  subtitle2,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cream bg-graph">
      <Navbar />

      {/* Main Content - Centered Form */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 pt-28">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3 tracking-tight">
              {title}
            </h1>
            <p className="text-text-secondary text-base">{subtitle}</p>
            {subtitle2 && (
              <p className="text-text-secondary text-base">{subtitle2}</p>
            )}
          </div>

          {/* Form Content - Card Container */}
          <div className="bg-white border border-border-light rounded-2xl shadow-lg p-8">
            {children}
          </div>
        </motion.div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 text-center">
        <p className="text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Your App. All rights reserved.
          <span className="mx-2">·</span>
          <Link to="/privacy" className="hover:text-text-primary">
            Privacy
          </Link>
          <span className="mx-2">·</span>
          <Link to="/terms" className="hover:text-text-primary">
            Terms
          </Link>
        </p>
      </footer>
    </div>
  )
}
