import axios from "axios";
import {
  getTokens,
  storeTokens,
  isTokenExpired,
  refreshAccessToken,
} from "../utils/auth";
import { config } from "dotenv";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Request interceptor to attach the access token to requests
api.interceptors.request.use(
    async (config) => {
      const { accessToken, refreshToken } = await getTokens();
  
      if (accessToken) {
        if (isTokenExpired(accessToken)) {
          // Refresh the token if it's expired
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            // Store the new access token
            await storeTokens(newAccessToken, refreshToken);
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          }
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor to handle token expiration or other errors
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // If the error is due to an expired token, try refreshing it
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // Store the new access token
          const { refreshToken } = await getTokens();
          await storeTokens(newAccessToken, refreshToken);
  
          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
export default api;
