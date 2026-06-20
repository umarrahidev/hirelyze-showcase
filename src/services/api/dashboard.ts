// client/src/services/api/dashboard.ts
import {api} from "../axios";

export const dashboardApi = {
  // Get comprehensive dashboard data
  getDashboardData: async () => {
    const response = await api.get('/dashboard/data');
    return response.data;
  },

  // Get recent activity
  getRecentActivity: async () => {
    const response = await api.get('/dashboard/activity');
    return response.data;
  },

  // Get job matches
  getJobMatches: async (limit = 3) => {
    const response = await api.get(`/dashboard/job-matches?limit=${limit}`);
    return response.data;
  },

  // Get resume analysis data
  getResumeAnalysis: async () => {
    const response = await api.get('/dashboard/resume-analysis');
    return response.data;
  },

  // Update dashboard settings
  updateDashboardSettings: async (settings: any) => {
    const response = await api.put('/dashboard/settings', { settings });
    return response.data;
  }
};