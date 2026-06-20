// src/services/axios.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_API_URL;
// console.log("API_BASE_URL >>> ", API_BASE_URL);

// ✅ JSON API instance (used for sending/receiving JSON data)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Form API instance (used for file uploads: FormData like voice, document, image)
const apiForm = axios.create({
  baseURL: API_BASE_URL,
  // No need to set Content-Type here — browser will set it automatically for FormData
});

// ✅ Attach JWT token to every request for authentication
const attachToken = (config) => {
  const token = localStorage.getItem('resume_authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// ✅ Attach token for both instances
api.interceptors.request.use(attachToken);
apiForm.interceptors.request.use(attachToken);

export { api, apiForm };
