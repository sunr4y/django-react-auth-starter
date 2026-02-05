import {
  Navbar,
  Hero,
  Features,
  HowItWorks,
  UseCases,
  Pricing,
  FAQ,
  CTA,
  Footer,
} from "@/components/landing"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-graph">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
