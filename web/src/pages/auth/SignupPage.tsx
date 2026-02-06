import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { AuthLayout, PasswordInput } from "@/components/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRegister, useResendActivation } from "@/hooks/use-auth-mutations"
import type { ApiError } from "@/types/auth"

function getErrorMessage(error: ApiError): string {
  const messages: string[] = []
  for (const key in error) {
    const value = error[key]
    if (Array.isArray(value)) {
      messages.push(...value)
    } else if (typeof value === "string") {
      messages.push(value)
    }
  }
  return messages[0] || "Something went wrong. Please try again."
}

export function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const registerMutation = useRegister()
  const resendActivationMutation = useResendActivation()
  const [resendCooldown, setResendCooldown] = useState(0)

  const isSuccess = registerMutation.isSuccess

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      )
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Client-side validation
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" })
      return
    }

    if (password.length < 8) {
      setErrors({ password: "Password must be at least 8 characters" })
      return
    }

    registerMutation.mutate(
      {
        email,
        username: email, // Use email as username
        password,
        re_password: confirmPassword,
        full_name: fullName,
        agreed_to_terms: agreedToTerms,
      },
      {
        onError: (error) => {
          const apiError = error.response?.data
          if (apiError) {
            // Map API errors to form fields
            const fieldErrors: Record<string, string> = {}
            for (const key in apiError) {
              const value = apiError[key]
              if (Array.isArray(value)) {
                fieldErrors[key] = value[0]
              } else if (typeof value === "string") {
                fieldErrors[key] = value
              }
            }
            setErrors(fieldErrors)
            toast.error(getErrorMessage(apiError))
          } else {
            toast.error("Something went wrong. Please try again.")
          }
        },
      }
    )
  }

  const handleResendActivation = () => {
    resendActivationMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("Activation email sent!")
          setResendCooldown(60) // 60-second cooldown
        },
        onError: () => {
          toast.error("Failed to resend activation email. Please try again.")
        },
      }
    )
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a link to activate your account."
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
            Activation email sent!
          </h3>
          <p className="text-text-secondary mb-6">
            Please check your inbox and click the activation link to complete
            your registration.
          </p>
          <p className="text-sm text-gray-dark">
            Didn't receive the email?{" "}
            <button
              onClick={handleResendActivation}
              disabled={
                resendActivationMutation.isPending || resendCooldown > 0
              }
              className="text-coral hover:text-coral-hover font-medium disabled:opacity-50"
            >
              {resendActivationMutation.isPending
                ? "Sending..."
                : resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend activation email"}
            </button>
          </p>
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            Already activated?{" "}
            <Link
              to="/login"
              className="text-coral hover:text-coral-hover font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Quickly get started"
      subtitle="Get started under a minute."
      subtitle2="Fill out the form and we'll send you an email to activate your account."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={errors.full_name ? "border-destructive" : ""}
          />
          {errors.full_name && (
            <p className="text-xs text-destructive">{errors.full_name}</p>
          )}
        </div>

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
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="Create a password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
          />
          {errors.password ? (
            <p className="text-xs text-destructive">{errors.password}</p>
          ) : (
            <p className="text-xs text-gray-dark">
              Must be at least 8 characters
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput
            id="confirmPassword"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword || !!errors.re_password}
          />
          {(errors.confirmPassword || errors.re_password) && (
            <p className="text-xs text-destructive">
              {errors.confirmPassword || errors.re_password}
            </p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
            required
          />
          <Label
            htmlFor="terms"
            className="text-sm text-text-secondary font-normal leading-relaxed cursor-pointer"
          >
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-coral hover:text-coral-hover font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-coral hover:text-coral-hover font-medium"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.agreed_to_terms && (
          <p className="text-xs text-destructive">{errors.agreed_to_terms}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={registerMutation.isPending || !agreedToTerms}
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-coral hover:text-coral-hover font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
