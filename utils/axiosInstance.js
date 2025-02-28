import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Flag to track ongoing token refresh requests
let isRefreshing = false;
let refreshSubscribers = [];

// Function to add failed request subscribers
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Function to notify all subscribers with new token
const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Request Interceptor: Attach token before request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response, // If the response is valid, return it
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = await AsyncStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token available");

          const response = await axios.post("http://localhost:3000/api/auth/refresh", { refreshToken });

          const newAccessToken = response.data.accessToken;
          await AsyncStorage.setItem("accessToken", newAccessToken);

          // Notify all subscribers with new token
          onRefreshed(newAccessToken);
          isRefreshing = false;

          return api(originalRequest); // Retry original request with new token
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      // Wait for refresh to complete and retry the request
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;