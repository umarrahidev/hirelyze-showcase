// client\src\pages\auth\SignWithGoogle.tsx
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import Footer from "@/components/layouts/LandingPage/Footer";

declare global {
  interface Window {
    google: any;
  }
}

const SignWithGoogle = () => {
    const navigate = useNavigate();
    const { loginWithGoogle } = useAuth();
    const buttonRef = useRef<HTMLDivElement>(null);
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    // On mount Render Google Sign-In button
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleSignIn;
        document.head.appendChild(script);

        return () => {
            // Cleanup
            const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, []);

    const initializeGoogleSignIn = () => {
        if (window.google && buttonRef.current && clientId) {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCredentialResponse,
            });

            window.google.accounts.id.renderButton(
                buttonRef.current,
                { 
                    theme: "outline",
                    size: "large", 
                    width: "400px", 
                    borderRadius: "10px",
                    text: "continue_with",
                    shape: "pill",
                    logo_alignment: "center"
                }
            );

            // Optional: Also offer one-tap sign-in
            window.google.accounts.id.prompt();
        }
    };

    const handleCredentialResponse = (response: any) => {
        if (response.credential) {
            handleGoogleSuccess(response.credential);
        } else {
            handleGoogleError();
        }
    };

    const handleGoogleSuccess = async (credential: string) => {
        try {
            await loginWithGoogle(credential);
            toast.success("Welcome back!");
            navigate("/upload-resume"); // Or dashboard
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Google sign-in failed");
        }
    };

    const handleGoogleError = () => {
        toast.error("Google sign-in failed");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Custom Navbar */}
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4">
                    <Link to="/" className="flex items-center gap-1 font-bold text-xl">
                        <span className="gradient-primary bg-clip-text text-transparent">Hirelyze</span>
                    </Link>
                    <Link to="/signin" className="text-sm font-medium hover:text-primary transition-colors">
                        Login
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="max-w-2xl w-full text-center space-y-4">

                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground">
                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                        Trusted by thousands of job seekers and professionals
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
                        Analyze your resume and get{" "}
                        <span className="gradient-primary bg-clip-text text-transparent">
                            job-ready in seconds
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        Sign in with Google to create your free Hirelyze AI account and instantly analyze your resume.
                    </p>

                    {/* Google Login Button */}
                    <div className="flex justify-center max-w-sm mx-auto w-full">
                        <div className="w-full space-y-6">
                            {/* Google Sign-In Button Container */}
                            <div className="flex justify-center">
                                <div 
                                    ref={buttonRef}
                                    className="w-full flex justify-center"
                                ></div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                                You'll get <span className="font-bold text-foreground">3 free AI analysis</span> to see how well your profile matches real job opportunities.
                            </p>
                        </div>
                    </div>

                    {/* Alternative Sign-in Options (Optional) */}
                    {/* <div className="pt-4">
                        <p className="text-sm text-muted-foreground">
                            By signing in, you agree to our{" "}
                            <Link to="/terms" className="text-primary hover:underline">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                    </div> */}

                    {/* Key Features / Trust indicators */}
                    <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground/80 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Instant Analysis</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span>Secure & Private</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
           <Footer/>
        </div>
    );
};

export default SignWithGoogle;