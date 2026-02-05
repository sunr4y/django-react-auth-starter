import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { AuthLayout, PasswordInput } from "@/components/auth"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useResetPassword } from "@/hooks/use-auth-mutations"

export function ResetPasswordPage() {
  const { uid, token } = useParams<{ uid: string; token: string }>()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const resetPasswordMutation = useResetPassword()
  const isSuccess = resetPasswordMutation.isSuccess

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

    if (!uid || !token) {
      toast.error("Invalid reset link")
      return
    }

    resetPasswordMutation.mutate(
      {
        uid,
        token,
        new_password: password,
        re_new_password: confirmPassword,
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

            // Check for token/uid errors (expired or invalid link)
            if (apiError.token || apiError.uid) {
              toast.error("This reset link is invalid or has expired.")
            } else {
              toast.error("Failed to reset password. Please try again.")
            }
          } else {
            toast.error("Something went wrong. Please try again.")
          }
        },
      }
    )
  }

  if (isSuccess) {
    return (
      <AuthLayout
        title="Password reset!"
        subtitle="Your password has been successfully reset."
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
            All done!
          </h3>
          <p className="text-text-secondary mb-6">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
          <Button asChild className="w-full" size="lg">
            <Link to="/login">Sign in</Link>
          </Button>
        </motion.div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Your new password must be different from previously used passwords."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Token/Link Error */}
        {(errors.token || errors.uid) && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">
              This reset link is invalid or has expired. Please request a new
              one.
            </p>
          </div>
        )}

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <PasswordInput
            id="password"
            placeholder="Enter new password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password || !!errors.new_password}
          />
          {errors.password || errors.new_password ? (
            <p className="text-xs text-destructive">
              {errors.password || errors.new_password}
            </p>
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
            placeholder="Confirm new password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword || !!errors.re_new_password}
          />
          {(errors.confirmPassword || errors.re_new_password) && (
            <p className="text-xs text-destructive">
              {errors.confirmPassword || errors.re_new_password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-secondary">
          Remember your password?{" "}
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
