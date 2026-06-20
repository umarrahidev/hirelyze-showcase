// client/src/services/api/auth.ts
import { api } from "../axios";

export const authApi = {
  // ✅ Register
  register: async (name: string, email: string, password: string) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  // ✅ Login
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // 🔵 Google Sign-In
  googleSignIn: async (credential: string) => {
    const response = await api.post("/auth/google-signin", {
      credential,
    });
    return response.data;
  },

  // ✅ Verify email
  verifyEmail: async (email: string, code: string) => {
    const response = await api.post("/auth/verify-email", { email, code });
    return response.data;
  },

  // ✅ Forgot password
  forgotPassword: async (email: string) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  // ✅ Change password
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.put("/auth/change-password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  // ✅ Reset password
  resetPassword: async (email: string, code: string, newPassword: string) => {
    const response = await api.post("/auth/reset-password", {
      email,
      code,
      newPassword,
    });
    return response.data;
  },

  // ✅ Verify reset code
  verifyResetCode: async (email: string, code: string) => {
    const response = await api.post("/auth/verify-reset-code", { email, code });
    return response.data;
  },
};
