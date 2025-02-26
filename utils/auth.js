import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt from "jwt-decode";
import api from "../api/api";

//Stores the tokens in the AsyncStorage
export const storeTokens = async (accessToken, refreshToken) => {
    try {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
    }
    catch (error) {
        console.error('Error storing tokens:', error);
    }
}

//Retrieves tokens from the AsyncStorage
export const getTokens = async () => {
    try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        return { accessToken, refreshToken };
    }
    catch (error) {
        console.error('Error getting tokens:', error);
    }
}

export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const decoded = jwt(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    }
    catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
}

export const refreshAccessToken = async () => {
    const { refreshToken } = await getTokens();

    if (!refreshToken) return null;

    try {
        const response = await api.post('/auth/refresh', { refreshToken });
        const { accessToken } = response.data;
        await storeTokens(accessToken, refreshToken);
        return accessToken;
    }
    catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}