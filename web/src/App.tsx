import { Routes, Route } from "react-router-dom"
import {
  LandingPage,
  SignupPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ActivatePage,
} from "@/pages"
import { GuestRoute } from "@/components/auth"

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/activate/:uid/:token" element={<ActivatePage />} />

      {/* Guest-only routes (redirect to / if logged in) */}
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

      {/* Protected routes example:
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      */}
    </Routes>
  )
}

export default App
