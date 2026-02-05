import { Routes, Route } from "react-router-dom"
import {
  DashboardPage,
  LandingPage,
  SignupPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ActivatePage,
} from "@/pages"
import { GuestRoute, ProtectedRoute } from "@/components/auth"

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/activate/:uid/:token" element={<ActivatePage />} />

      {/* Guest-only routes (redirect to /dashboard if logged in) */}
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <SignupPage />
          </GuestRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <GuestRoute>
            <ForgotPasswordPage />
          </GuestRoute>
        }
      />
      <Route
        path="/password-reset/:uid/:token"
        element={
          <GuestRoute>
            <ResetPasswordPage />
          </GuestRoute>
        }
      />

      {/* Protected routes (redirect to /login if not logged in) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
