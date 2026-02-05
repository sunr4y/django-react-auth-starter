import { Routes, Route } from "react-router-dom"
import {
  LandingPage,
  SignupPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ActivatePage,
} from "@/pages"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/password-reset/:uid/:token"
        element={<ResetPasswordPage />}
      />
      <Route path="/activate/:uid/:token" element={<ActivatePage />} />
    </Routes>
  )
}

export default App
