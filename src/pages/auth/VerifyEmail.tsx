// client\src\pages\auth\VerifyEmail.tsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, Mail, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authApi } from "@/services/api/auth";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    useEffect(() => {
        const urlEmail = searchParams.get('email');
        const locationStateEmail = history.state?.usr?.email;

        if (urlEmail) {
            setEmail(urlEmail);
        } else if (locationStateEmail) {
            setEmail(locationStateEmail);
        }
    }, [searchParams]);

    const handleVerify = async () => {
        if (code.length !== 6) {
            toast.error("Please enter a 6-digit code");
            return;
        }

        if (!email) {
            toast.error("Email not found. Please try registering again.");
            navigate("/register");
            return;
        }

        setIsLoading(true);

        try {
            await authApi.verifyEmail(email, code);
            toast.success("Email verified successfully!");
            navigate("/login", {
                state: { message: "Email verified! You can now login." }
            });
        } catch (error: any) {
            toast.error(error.message || "Invalid verification code");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error("Email not found. Please try registering again.");
            navigate("/register");
            return;
        }

        setIsResending(true);

        try {
            await authApi.register("", email, "");
            toast.success("Verification code resent!");
        } catch (error: any) {
            toast.error(error.message || "Failed to resend code");
        } finally {
            setIsResending(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-4">Enter Your Email</h1>
                        <p className="text-muted-foreground text-lg">
                            Please enter your email address to verify
                        </p>
                    </div>

                    <Card>
                        <CardContent className="p-8">
                            <div className="space-y-6">
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 text-base"
                                />
                                <Button
                                    onClick={() => setEmail(email)}
                                    className="w-full h-12 text-base"
                                    disabled={!email}
                                    variant="hero"
                                >
                                    Continue
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShieldCheck className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-4">Verify Your Email</h1>
                    <p className="text-muted-foreground text-lg">
                        We sent a 6-digit code to <span className="font-semibold text-foreground">{email}</span>
                    </p>
                </div>

                <Card>
                    <CardContent className="p-8">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="flex justify-center">
                                    <InputOTP
                                        maxLength={6}
                                        value={code}
                                        onChange={setCode}
                                        disabled={isLoading}
                                    >
                                        <InputOTPGroup className="gap-3">
                                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                                <InputOTPSlot
                                                    key={index}
                                                    index={index}
                                                    className="w-12 h-12 text-lg border-2"
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                <p className="text-center text-muted-foreground">
                                    Enter the 6-digit code sent to your email
                                </p>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    onClick={handleVerify}
                                    disabled={isLoading || code.length !== 6}
                                    variant="hero"
                                    shape="pill"
                                    size="lg"
                                    className="w-full"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            Verify Email
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>

                                <div className="text-center text-sm">
                                    <span className="text-muted-foreground">Didn't receive the code? </span>
                                    <button
                                        onClick={handleResend}
                                        disabled={isResending}
                                        className="text-primary hover:text-primary/80 hover:underline font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isResending ? "Sending..." : "Resend Code"}
                                    </button>
                                </div>

                                <div className="text-center">
                                    <button
                                        onClick={() => setEmail("")}
                                        className="text-muted-foreground hover:text-foreground text-sm transition-colors hover:underline"
                                    >
                                        Use different email
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VerifyEmail;