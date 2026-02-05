import { Menu, X, Github } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-border-light">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight"
          >
            <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">A</span>
            </div>
            <span>AuthKit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <Button variant="ghost" asChild>
              <a href="#features">Features</a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#how-it-works">How it Works</a>
            </Button>
            <Button variant="ghost" asChild>
              <a
                href="https://github.com/maniishbhusal/django-react-auth-starter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-light">
            <div className="flex flex-col">
              <Button variant="ghost" asChild className="justify-start">
                <a href="#features">Features</a>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <a href="#how-it-works">How it Works</a>
              </Button>
              <Button variant="ghost" asChild className="justify-start">
                <a
                  href="https://github.com/maniishbhusal/django-react-auth-starter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <div className="flex flex-col gap-3 pt-4 border-t border-border-light">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
