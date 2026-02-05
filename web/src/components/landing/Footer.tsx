import { Github, Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Documentation", href: "https://github.com/maniishbhusal/django-react-auth-starter#readme" },
  ],
  resources: [
    { label: "Getting Started", href: "https://github.com/maniishbhusal/django-react-auth-starter#quick-start" },
    { label: "API Reference", href: "https://github.com/maniishbhusal/django-react-auth-starter#api-endpoints" },
    { label: "Examples", href: "https://github.com/maniishbhusal/django-react-auth-starter#examples" },
  ],
  legal: [
    { label: "MIT License", href: "https://github.com/maniishbhusal/django-react-auth-starter/blob/main/LICENSE" },
    { label: "Contributing", href: "https://github.com/maniishbhusal/django-react-auth-starter/blob/main/CONTRIBUTING.md" },
  ],
}

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/maniishbhusal",
    icon: Github,
  },
  {
    label: "Twitter",
    href: "https://x.com/maniishbhusal",
    icon: Twitter,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/maniishbhusal",
    icon: Linkedin,
  },
]

export function Footer() {
  return (
    <footer className="py-16 bg-dark">
      <div className="container-custom">
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-4"
            >
              <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">A</span>
              </div>
              <span>AuthKit</span>
            </Link>
            <p className="text-sm text-gray leading-relaxed max-w-[280px]">
              Open-source authentication starter for Django & React. Production-ready with JWT, email verification, and more.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-5">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray hover:text-text-muted transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray hover:text-text-muted transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray hover:text-text-muted transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-soft flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-dark">
            &copy; {new Date().getFullYear()} AuthKit. MIT Licensed.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-dark hover:text-text-muted transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
