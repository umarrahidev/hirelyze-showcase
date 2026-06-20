import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-foreground mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>

        {/* Dynamic Route Info */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <p className="text-muted-foreground text-sm mb-2">You tried to access:</p>
          <code className="text-primary font-mono text-lg break-all bg-primary/10 px-2 py-1 rounded">
            {location.pathname}
          </code>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="hero" size="lg" className="gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;