// client/src/types.ts

// ─────────────────────────────────────────────────────────────────────────────
// Auth / User — mirrors the backend auth response payload
// ─────────────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  email: string;
  name: string | null;
  verified: boolean;

  // Role
  role_id: number;
  role: "user" | "admin" | null;

  // Subscription
  plan: "free" | "pro" | "enterprise";
  status: "active" | "inactive" | "suspended";
  subscription_expires_at?: string | null;

  // Profile (from eager-loaded profile relation)
  profile_picture?: string | null;

  // Timestamps
  created_at?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Quota — returned alongside auth responses and refreshed on analysis
// ─────────────────────────────────────────────────────────────────────────────
export interface QuotaInfo {
  used: number;
  limit: number;
  remaining: number;
  resetTime: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Report — mirrors the reports table (snake_case columns)
// ─────────────────────────────────────────────────────────────────────────────
export interface Report {
  id: number;

  // Core fields
  file_name: string;
  overall_score: number;
  feedback: string;
  improved_text: string;
  original_text?: string;
  primary_role?: string;

  // Analysis JSON columns
  strengths?: string[];
  weaknesses?: string[];
  tips?: string[];
  skill_gap?: { name: string; type: string; priority: string }[];
  interview_prep?: { question: string; answer: string }[];
  job_recommendations?: {
    title: string;
    company: string;
    location: string;
    url: string;
    source: string;
    salary?: string;
  }[];
  analysis_data?: {
    strengths?: string[];
    weaknesses?: string[];
    tips?: string[];
    skill_gap?: { name: string; type: string; priority: string }[];
    interview_prep?: { question: string; answer: string }[];
    job_recommendations?: any[];
  };

  // Visibility
  is_public?: boolean;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// AnalysisResult — in-flight result returned by the resume analysis API
// Uses snake_case to match the backend controller response
// ─────────────────────────────────────────────────────────────────────────────
export interface AnalysisResult {
  reportId?: number;
  overall_score: number;
  feedback: string;
  improved_text: string;

  // Flat analysis fields
  strengths?: string[];
  weaknesses?: string[];
  tips?: string[];
  skill_gap?: { name: string; type: string; priority: string }[];
  interview_prep?: { question: string; answer: string }[];
  job_recommendations?: any[];

  // Nested copy kept for child components that access .analysisData.*
  analysisData?: {
    strengths?: string[];
    weaknesses?: string[];
    tips?: string[];
    skill_gap?: { name: string; type: string; priority: string }[];
    interview_prep?: { question: string; answer: string }[];
    job_recommendations?: any[];
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Job — third-party job board API shape (not stored in our DB)
// ─────────────────────────────────────────────────────────────────────────────
export interface Job {
  job_id?: string;
  employer_name: string;
  employer_logo?: string;
  employer_website?: string;
  job_publisher?: string;
  job_employment_type?: string;
  job_title: string;
  job_apply_link: string;
  job_description?: string;
  job_is_remote?: boolean;
  job_posted_at_timestamp?: number;
  job_posted_at_datetime_utc?: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
  job_latitude?: number;
  job_longitude?: number;
  job_google_link?: string;
  // Computed fields
  job_location?: string;
  job_salary?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Theme
// ─────────────────────────────────────────────────────────────────────────────
export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "light" | "dark";
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard (user-facing, per-user data)
// ─────────────────────────────────────────────────────────────────────────────
export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
  bg: string;
}

export interface DashboardActivity {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "analysis" | "match" | "prep" | "update" | "interview";
}

export interface DashboardJobMatch {
  title: string;
  company: string;
  matchScore: number;
  salary?: string;
}

export interface DashboardResumeAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  tips: string[];
}

export interface DashboardData {
  stats: DashboardStat[];
  score: number;
  strengths: string[];
  weaknesses: string[];
  tips: string[];
}

export interface DashboardResponse {
  message: string;
  data: DashboardData;
}

export interface DashboardActivityResponse {
  message: string;
  activities: DashboardActivity[];
}

export interface DashboardJobMatchesResponse {
  message: string;
  jobMatches: DashboardJobMatch[];
}

export interface DashboardResumeAnalysisResponse {
  message: string;
  analysis: DashboardResumeAnalysis | null;
}

export interface DashboardSettings {
  showRecentActivity: boolean;
  showJobMatches: boolean;
  showAnalysisResults: boolean;
  showStats: boolean;
  defaultView: "overview" | "analytics" | "matches";
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin Dashboard — platform-wide analytics (super admin only)
// ─────────────────────────────────────────────────────────────────────────────
export interface AdminDashboardSummary {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  recentRegistrations: number;
  newThisWeek: number;
}

export interface AdminDashboardResponse {
  message: string;
  data: {
    summary: AdminDashboardSummary;
    usersByPlan: { plan: string; count: number }[];
    usersByStatus: { status: string; count: number }[];
    recentUsers: User[];
  };
}
