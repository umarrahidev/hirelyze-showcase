// client/src/services/api/issue.ts
import { api, apiForm } from "../axios";

export const issueApi = {
  // ✅ Get all issues
  getAllIssues: async () => {
    const response = await api.get("/issues");
    return response.data;
  },

  // ✅ Get issue by id
  getIssueById: async (id: string) => {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  },

  // ✅ Create issue
  createIssue: async (issueData: {
    title: string;
    description: string;
    image?: File;
  }) => {
    const formData = new FormData();
    formData.append("title", issueData.title);
    formData.append("description", issueData.description);
    if (issueData.image) {
      formData.append("image", issueData.image);
    }
    const response = await apiForm.post("/issues/", formData);
    return response.data;
  },

  // ✅ Delete issue
  deleteIssue: async (id: string) => {
    const response = await apiForm.delete(`/issues/${id}`);
    return response.data;
  },
};
