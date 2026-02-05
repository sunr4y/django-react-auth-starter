import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { AuthLayout } from "@/components/auth"
import { Button } from "@/components/ui/button"
import { useActivate } from "@/hooks/use-auth-mutations"

export function ActivatePage() {
  const { uid, token } = useParams<{ uid: string; token: string }>()

  const activateMutation = useActivate()

  // Trigger activation on mount
  useEffect(() => {
    if (
      uid &&
      token &&
      !activateMutation.isSuccess &&
      !activateMutation.isError
    ) {
      activateMutation.mutate({ uid, token })
    }
  }, [uid, token]) // eslint-disable-line react-hooks/exhaustive-deps

  if (activateMutation.isPending) {
    return (
      <AuthLayout
        title="Activating your account"
        subtitle="Please wait while we verify your email..."
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-8 h-8 text-coral animate-spin" />
          </div>
          <p className="text-text-secondary">Verifying your email address...</p>
        </motion.div>
      </AuthLayout>
    )
  }

  if (activateMutation.isError) {
    return (
      <AuthLayout
        title="Activation failed"
        subtitle="We couldn't activate your account."
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Invalid or expired link
          </h3>
          <p className="text-text-secondary mb-6">
            This activation link is invalid or has expired. Please request a new
            activation email.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link to="/signup">Request new link</Link>
            </Button>
            <p className="text-sm text-gray-dark">
              Already activated?{" "}
              <Link
                to="/login"
                className="text-coral hover:text-coral-hover font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </AuthLayout>
    )
  }

  // Success state
  return (
    <AuthLayout
      title="Account activated!"
      subtitle="Your email has been verified successfully."
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
          You're all set!
        </h3>
        <p className="text-text-secondary mb-6">
          Your account has been activated. You can now sign in and start using
          the app.
        </p>
        <Button asChild className="w-full" size="lg">
          <Link to="/login">Sign in to your account</Link>
        </Button>
      </motion.div>
    </AuthLayout>
  )
}
