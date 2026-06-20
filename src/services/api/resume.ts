// client\src\services\api\resume.ts
import { api, apiForm } from "../axios";

export const resumeApi = {
  // ✅ Analyze full resume + job recommendations
  analyzeResumeFull: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiForm.post("/resume/analyze", formData);
    return response.data;
  },

  // ✅ Get quota info
  getQuotaInfo: async () => {
    const response = await api.get("/resume/quota");
    return response.data;
  },

  // ✅ Resume correct agent
  resumeCorrectAgent: async (resumeText: string) => {
    const response = await api.post("/resume/correct", { resumeText });
    return response.data;
  },

};
