import axios from "axios";

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000", // Default fallback
  headers: {
    "Content-Type": "application/json",
  },
});

// You can also configure interceptors here if needed for authentication tokens

export default apiClient;
