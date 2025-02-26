import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/api/api";
import { isAxiosError } from "axios";
import InputBox from "@/components/inputBox";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  //Check if passowrd is valid
  useEffect(() => {
    const min8letters = password.length >= 8;
    const min1Upper = /[A-Z]/.test(password);
    const min1Number = /[0-9]/.test(password);
    const min1Special = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setIsPasswordValid(min8letters && min1Upper && min1Number && min1Special);
  }, [password]);

  //Check if email is valid
  useEffect(() => {
    const includesAt = email.includes("@");
    const includesDotCom = email.includes(".com");

    setIsEmailValid(includesAt && includesDotCom);
  }, [email]);

  //Writing any input changes erases the error
  useEffect(() => {
    setError(false);
  }, [username, email, password]);

  //register call to the api
  const handleRegister = async () => {
    try {
      setLoading(true);
      const lowerCaseEmail = email.toLowerCase();
      console.log(lowerCaseEmail);
      const response = await api.post(
        "/users/register",
        {
          username: username,
          email: lowerCaseEmail,
          password: password,
        }
      );
      setLoading(false);
      setPassword("");
      setUsername("");
      setEmail("");

      Alert.alert("Success", "You have successfully registered");
      AsyncStorage.setItem("token", response.data.token);

      router.replace("/(tabs)");

    } catch (error_message) {
      setLoading(false);
      setError(true);
      if (isAxiosError(error_message)) {
        if (error_message.response?.status === 400) {
            setErrorMessage("This email is already registered. Login instead.");
        } else if (error_message.response?.status === 500) {
          setErrorMessage("Ops! Server is busy. Try again later.");
        } else {
            setErrorMessage("Ops! Server is busy. Try again later.");
        }
      } else {
        console.log(error_message);
        setErrorMessage("Ops! Server is busy. Try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>PULSE</Text>
      </View>
      <View>
        <Text style={styles.subHeaderText}>Welcome to Pulse</Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 50 }}>
        <Text style={styles.subtitle}>Be better everyday</Text>
      </View>
      <View>
        <InputBox
          title="Username"
          type="username"
          onChangeText={(text) => setUsername(text)}
        />
        <InputBox
          title="Email"
          type="email"
          onChangeText={(text) => setEmail(text)}
        />
        <InputBox
          title="Password"
          type="password"
          verifications
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={{ marginTop: 50 }}>
        <Button
          title="Register"
          onPress={handleRegister}
          variant="first"
          color="primary"
          clickable={isEmailValid && isPasswordValid}
          loading={loading}
          error={error}
          errorMessage={errorMessage}
        ></Button>
      </View>
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Text style={styles.firstText}>Already have an account ? </Text>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.secondText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    fontSize: 56,
    fontFamily: "Anton-Regular",
    color: "#1E90FF",
  },

  subHeaderText: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },

  subtitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#9F9D9D",
  },

  firstText: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: "#9F9D9D",
  },

  secondText: {
    fontFamily: "Roboto-Bold",
    fontSize: 12,
    color: "#000000",
  },
});
