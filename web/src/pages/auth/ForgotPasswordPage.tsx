import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { AuthLayout } from "@/components/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForgotPassword } from "@/hooks/use-auth-mutations"

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("")

  const forgotPasswordMutation = useForgotPassword()
  const isSuccess = forgotPasswordMutation.isSuccess

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    forgotPasswordMutation.mutate(
      { email },
      {
        onError: () => {
          // Don't reveal if email exists or not for security
          // The API returns 204 even if email doesn't exist
          toast.error("Something went wrong. Please try again.")
        },
      }
    )
  }

  const handleRetry = () => {
    forgotPasswordMutation.reset()
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a password reset link."
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Reset link sent!
          </h3>
          <p className="text-text-secondary mb-6">
            We've sent a password reset link to{" "}
            <span className="font-medium text-text-primary">{email}</span>.
            Please check your inbox.
          </p>
          <p className="text-sm text-gray-dark">
            Didn't receive the email?{" "}
            <button
              onClick={handleRetry}
              className="text-coral hover:text-coral-hover font-medium"
            >
              Try again
            </button>
          </p>
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries, we'll send you reset instructions."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  )
}
