// client/src/App.tsx
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import ResumeChatBot from "@/components/ResumeChatBot";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import EnterResetCode from "./pages/auth/EnterResetCode";
import LandingPage from "./pages/LandingPage/LandingPage";
import Reports from "./pages/App/Reports";
import AppLayout from "./components/layouts/App/AppLayout";
import ResumeAnalysis from "./pages/App/ResumeAnalysis";
import ReportIssue from "./pages/App/IssueForm";
import SubmitSuggestion from "./pages/App/SuggestionForm";
import SignWithGoogle from "./pages/auth/SignWithGoogle";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <ThemeProvider> */}

    <TooltipProvider>
      <AuthProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: "text-xs",
            duration: 5000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/enter-reset-code" element={<EnterResetCode />} />

            <Route path="/signin" element={<SignWithGoogle />} />

            {/* Wrap all routes with DashboardLayout */}
            <Route element={<AppLayout />}>
              <Route path="/upload-resume" element={<ProtectedRoute><ResumeAnalysis /></ProtectedRoute>} />
              <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/report-issue" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
              <Route path="/submit-suggestion" element={<ProtectedRoute><SubmitSuggestion /></ProtectedRoute>} />
            </Route>


            <Route path="*" element={<NotFound />} />
          </Routes>
          <ResumeChatBot />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
    {/* </ThemeProvider> */}

  </QueryClientProvider>
);

export default App;