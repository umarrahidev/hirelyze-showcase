// client/src/services/api/suggestion.ts
import { api, apiForm } from "../axios";

export const suggestionApi = {
  // ✅ Get all suggestions
  getAllSuggestions: async () => {
    const response = await api.get("/suggestions");
    return response.data;
  },

  // ✅ Get suggestion by id
  getSuggestionById: async (id: string) => {
    const response = await api.get(`/suggestions/${id}`);
    return response.data;
  },

  // ✅ Create suggestion
  createSuggestion: async (suggestionData: {
    title: string;
    description: string;
    image?: File;
  }) => {
    const formData = new FormData();
    formData.append("title", suggestionData.title);
    formData.append("description", suggestionData.description);
    if (suggestionData.image) {
      formData.append("image", suggestionData.image);
    }
    const response = await apiForm.post("/suggestions/", formData);
    return response.data;
  },

  // ✅ Delete suggestion
  deleteSuggestion: async (id: string) => {
    const response = await apiForm.delete(`/suggestions/${id}`);
    return response.data;
  },
};
