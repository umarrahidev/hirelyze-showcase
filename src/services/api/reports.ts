// client/src/services/api/reports.ts
import { api } from "../axios";

export const reportsApi = {
  // ✅ Get all reports (paginated + searchable)
  getAllReports: async (page = 1, limit = 6, search = "") => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });
    const response = await api.get(`/reports?${params}`);
    return response.data;
  },

  // ✅ Get report by id
  getReportById: async (id: string) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  // ✅ Save new report — field names match the backend controller (snake_case)
  saveReport: async (reportData: {
    file_name: string;
    original_text?: string;
    improved_text: string;
    overall_score: number;
    feedback?: string;
    analysis_data?: any;
    strengths?: string[];
    weaknesses?: string[];
    tips?: string[];
    skill_gap?: any[];
    interview_prep?: any[];
    job_recommendations?: any[];
  }) => {
    const response = await api.post("/reports/save", reportData);
    return response.data;
  },

  // ✅ Delete report
  deleteReport: async (id: string) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },

  // ✅ Update report visibility — snake_case body key
  updateReportVisibility: async (id: string, is_public: boolean) => {
    const response = await api.put(`/reports/${id}/visibility`, { is_public });
    return response.data;
  },
};
