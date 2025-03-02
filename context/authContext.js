import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/axiosInstance";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState(null);

  //get user when app starts
  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      const accessToken = await AsyncStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const response = await api.get("/auth/me");
          setUser(response.data.user);
        } catch (error) {
          console.log("Error fetching user:", error);
          setUser(null);
          await AsyncStorage.removeItem("accessToken");
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  const login = async (email, password) => {
    setLoginLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);

      setUser(response.data.user);
      
      Alert.alert("Success", "You have successfully logged in");
      router.replace("/(tabs)");
    } catch (err) {
      console.log("Login Error:", err);
      setError("Invalid email or password. Try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!refreshToken) {
        Alert.alert("Error", "No refresh token found.");
        return;
      }

      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");

      const response = await api.post("/auth/logout", {
        refreshToken,
      });

      if (response.status === 200) {
        setUser(null);
        Alert.alert("Success", "Logged out successfully.");
        router.replace("/login");
      } else {
        Alert.alert("Error", "An error occurred while logging out.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, login, loginLoading,  setError, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
