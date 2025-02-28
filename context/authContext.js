import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";

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
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        try {
          const response = await axios.get("http://localhost:3000/api/auth/me"); // FIXED: Added "http://"
          setUser(response.data.user);
        } catch (error) {
          console.log("Error fetching user:", error);
          setUser(null);
          await AsyncStorage.removeItem("accessToken"); // Remove expired token
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
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;
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

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, login, setError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
