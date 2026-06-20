// client\src\pages\auth\EnterResetCode.tsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Mail, Loader2, ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authApi } from "@/services/api/auth";
import toast from "react-hot-toast";

const EnterResetCode = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Get email from URL parameters or location state
  useEffect(() => {
    const urlEmail = searchParams.get("email");
    const locationStateEmail = history.state?.usr?.email;

    if (urlEmail) {
      setEmail(urlEmail);
    } else if (locationStateEmail) {
      setEmail(locationStateEmail);
    }
  }, [searchParams]);

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      toast.error("Please enter a 6-digit code");
      return;
    }

    if (!email) {
      toast.error(
        "Email not found. Please try the forgot password process again."
      );
      navigate("/forgot-password");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.verifyResetCode(email, code);
      toast.success("Code verified successfully!");
      navigate("/reset-password", {
        state: {
          email,
          code,
          message:
            "Code verified successfully. You can now reset your password.",
        },
      });
    } catch (error: any) {
      toast.error(
        error.message ||
          "Invalid reset code. Please check the code and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error(
        "Email not found. Please try the forgot password process again."
      );
      navigate("/forgot-password");
      return;
    }

    setIsResending(true);

    try {
      await authApi.forgotPassword(email);
      toast.success("Reset code resent to your email!");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  // If no email is provided, show email input
  if (!email) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Link to="/" className="flex items-center gap-1 font-bold text-xl">
                <span className="gradient-primary bg-clip-text text-transparent">Hirelyze</span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold">Enter Your Email</h1>
            <p className="text-muted-foreground mt-2">
              Please enter your email address to reset password
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-xl">Reset Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setEmail(email)}
                  variant="hero"
                  shape="pill"
                  size="lg"
                  className="w-full"
                  disabled={!email}
                >
                  Continue
                </Button>
                <div className="text-center">
                  <Link
                    to="/forgot-password"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Forgot Password
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Enter Reset Code</h1>
          <p className="text-muted-foreground mt-2">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-foreground">{email}</span>
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-center text-xl">Reset Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Reset Code</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="pl-10"
                    maxLength={6}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Enter the 6-digit reset code sent to your email
              </p>
            </div>

            <Button
              onClick={handleVerifyCode}
              variant="hero"
              shape="pill"
              size="lg"
              className="w-full"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying Code...
                </>
              ) : (
                "Verify Code"
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Didn't receive the code?{" "}
              </span>
              <button
                onClick={handleResendCode}
                disabled={isResending}
                className="text-primary hover:text-primary/80 hover:underline font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isResending ? "Sending..." : "Resend Code"}
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => setEmail("")}
                className="text-primary hover:text-primary/80 hover:underline text-sm transition-colors"
              >
                Use different email
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Forgot Password
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnterResetCode;