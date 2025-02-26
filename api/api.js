import axios from "axios";
import Constants from "expo-constants";
import {
  getTokens,
  storeTokens,
  isTokenExpired,
  refreshAccessToken,
  clearTokens,
} from "../utils/auth";

const api = axios.create({
  baseURL: Constants.expoConfig.extra.API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken } = await getTokens();

    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          await storeTokens(newAccessToken, refreshToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        const { refreshToken } = await getTokens();
        await storeTokens(newAccessToken, refreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }

      // If refresh fails, clear tokens and handle logout
      await clearTokens();
    }

    return Promise.reject(error);
  }
);

export default api;
