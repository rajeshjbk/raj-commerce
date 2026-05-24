import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-backend-mhno.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    // Admin token
    const adminToken = localStorage.getItem("adminJwtToken");

    // User token
    const userToken = localStorage.getItem("jwtToken");

    // Prefer admin token
    let token = adminToken || userToken;

    if (token && token !== "undefined") {
      // Remove duplicate Bearer if exists
      token = token.replace("Bearer ", "");

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default api;
