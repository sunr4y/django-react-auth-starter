import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"

interface GuestRouteProps {
  children: React.ReactNode
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (isAuthenticated) {
    // If user is logged in, redirect to where they came from or dashboard
    const from = (location.state as { from?: Location })?.from?.pathname || "/"
    return <Navigate to={from} replace />
  }

  return <>{children}</>
}
