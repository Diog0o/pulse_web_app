import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading , setLoading] = useState(true);

  const router = useRouter();

  const [loaded] = useFonts({
    "Anton-Regular": require("../assets/fonts/Anton-Regular.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Italic": require("../assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Semibold": require("../assets/fonts/Roboto-SemiBold.ttf"),
  })

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //Check the authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(token ? true : false);
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isMounted && !loading && loaded && isAuthenticated === false) {
      router.replace("/login");
    }
  }, [isMounted, loading, loaded, isAuthenticated]);

  if (loading || !loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
        headerShown: false,
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
        title: "Not Found",
          }}
        />
        <Stack.Screen 
          name="login"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
