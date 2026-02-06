import { type ReactNode } from "react"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Is this starter free to use?",
    answer:
      "Yes! This is an open-source starter template. Use it for any project.",
  },
  {
    question: "What authentication features are included?",
    answer:
      "JWT authentication, email verification, password reset, and user profiles.",
  },
  {
    question: "What tech stack does this use?",
    answer:
      "Django 5 with Django REST Framework for the backend, React 19 with TypeScript and TanStack Query for the frontend.",
  },
  {
    question: "Can I customize the email templates?",
    answer:
      "Yes! Email templates are fully customizable in the Django templates folder. Just change the site_name in email.py.",
  },
  {
    question: "Is this production-ready?",
    answer:
      "Yes! Includes 45+ tests, rate limiting, proper security headers, and follows best practices.",
  },
  {
    question: "How do I deploy this?",
    answer: (
      <>
        The backend can be deployed to any VPS with Docker. Check out our{" "}
        <a
          href="https://bhusalmanish.com.np/blog/posts/deploy-drf-production.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-coral hover:underline"
        >
          detailed deployment guide
        </a>
        . The frontend can be deployed to Vercel or Netlify.
      </>
    ),
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 border-t border-border-light">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary">
            Everything you need to know about this starter
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-[700px] mx-auto"
        >
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
