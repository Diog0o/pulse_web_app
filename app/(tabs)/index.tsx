import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useAuth } from "@/context/authContext";

export default function Home() {
  const router = useRouter();
  const { logout } = useAuth();


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => logout() }>
        <Text style={{ color: "#FFF" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    margin: 20,
  },
  button: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
