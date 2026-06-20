// client/src/components/ProtectedRoute.tsx
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Check for token in localStorage as fallback
  const token = localStorage.getItem('resume_authToken');
  
  if (!isAuthenticated && !token) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};