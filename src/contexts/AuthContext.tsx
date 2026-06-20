// client\src\contexts\AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/services/api/auth";
import { resumeApi } from "@/services/api/resume";
import { User, QuotaInfo } from "@/types";

interface AuthContextType {
  user: User | null;
  quota: QuotaInfo | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  refreshQuota: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [quota, setQuota] = useState<QuotaInfo | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("resume_authToken");
      const userData = localStorage.getItem("resume_userData");
      const quotaData = localStorage.getItem("resume_quotaData");

      if (token && userData) {
        try {
          setUser(JSON.parse(userData));

          if (quotaData) {
            setQuota(JSON.parse(quotaData));
          } else {
            // Only fetch quota if we have a token but no quota data
            await refreshQuota();
          }
        } catch (error) {
          console.error("Error initializing auth state:", error);
          // Clear invalid data
          localStorage.removeItem("resume_authToken");
          localStorage.removeItem("resume_userData");
          localStorage.removeItem("resume_quotaData");
        }
      }
    };

    initializeAuth();
  }, []);

  // Refresh quota information
  const refreshQuota = async () => {
    try {
      const data = await resumeApi.getQuotaInfo();
      setQuota(data.quota);
      localStorage.setItem("resume_quotaData", JSON.stringify(data.quota)); // Fix this line
    } catch (error) {
      console.error("Failed to fetch quota:", error);
    }
  };

  // Email/Password Login
  const login = async (email: string, password: string) => {
    const data = await authApi.login(email, password);

    // Check if user is verified
    if (!data.user.verified) {
      throw new Error("Please verify your email before logging in.");
    }

    localStorage.setItem("resume_authToken", data.token);
    localStorage.setItem("resume_userData", JSON.stringify(data.user));
    localStorage.setItem("resume_quotaData", JSON.stringify(data.quota));

    setUser(data.user);
    setQuota(data.quota);
  };

  // Google OAuth Login
  const loginWithGoogle = async (credential: string) => {
    try {
      const response = await authApi.googleSignIn(credential);
      const { token, user, quota } = response;

      localStorage.setItem("resume_authToken", token); // Use consistent key
      localStorage.setItem("resume_userData", JSON.stringify(user));
      localStorage.setItem("resume_quotaData", JSON.stringify(quota));

      setUser(user);
      setQuota(quota);

      return response;
    } catch (error) {
      throw error;
    }
  };

  // User Registration
  const register = async (name: string, email: string, password: string) => {
    const data = await authApi.register(name, email, password);
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem("resume_authToken");
    localStorage.removeItem("resume_userData");
    localStorage.removeItem("resume_quotaData");
    setUser(null);
    setQuota(null);
  };

  const value: AuthContextType = {
    user,
    quota,
    login,
    loginWithGoogle,
    register,
    logout,
    isAuthenticated: !!user,
    refreshQuota,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
