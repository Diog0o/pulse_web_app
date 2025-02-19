import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import InputBox from "@/components/inputBox";
import Button from "../components/Button";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const google_img = require("../assets/images/google.png");
const facebook_img = require("../assets/images/facebook.png");
const apple_img = require("../assets/images/apple.png");


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handlePasswordChange = (text: string, validationState?: any) => {
    setPassword(text);
    setIsPasswordValid(
      validationState.min8 &&
        validationState.min1Upper &&
        validationState.min1Number &&
        validationState.min1Special
    );
  };

const handleLogin = async ()  => {
    try {
        const response = await axios.post("http://localhost:3000/api/users/login", {
            email,
            password
        })
        Alert.alert("Success", "You have successfully logged in")
        console.log(response.data)

        //Save the token
        console.log(response.data.token)
        AsyncStorage.setItem("token", response.data.token)
    }
    catch {

    }
}

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>PULSE</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Welcome back to Pulse</Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 50 }}>
        <Text style={styles.signinmessage}>Sign in into your account</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <InputBox
          title="Email"
          type="email"
          onChangeText={(text) => setEmail(text)}
        />
        <InputBox
          title="Password"
          type="password"
          onChangeText={handlePasswordChange}
        />
      </View>
      <View style={styles.separatorcontainer}>
        <View style={styles.orline} />
        <Text style={styles.ortext}>or</Text>
        <View style={styles.orline} />
      </View>
      <View>
        <Text style={styles.undertext}>Sign up using</Text>
      </View>
      <View style={styles.imagecontainers}>
        <TouchableOpacity>
          <View style={styles.imagecontainer}>
            <Image source={google_img} style={styles.image} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.imagecontainer}>
            <Image source={facebook_img} style={styles.image} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.imagecontainer}>
            <Image source={apple_img} style={styles.image} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 50 }}>
        <Button
          title="Login"
          onPress={() => console.log("Sign In")}
          variant="first"
          color="primary"
          clickable={isPasswordValid && email.length > 0}
          loading={false}
        />
      </View>
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <Text style={styles.firstText}>Don't have an account ? </Text>
        <TouchableOpacity>
          <Text style={styles.secondText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: "center",
  },

  title: {
    fontSize: 56,
    fontFamily: "Anton-Regular",
    color: "#1E90FF",
  },

  subtitle: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
  },

  signinmessage: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#9F9D9D",
  },

  separatorcontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  orline: {
    height: 1,
    width: 140,
    backgroundColor: "#9F9D9D",
  },

  ortext: {
    fontSize: 12,
    fontFamily: "Roboto-Bold",
    color: "#9F9D9D",
    marginHorizontal: 10,
  },

  undertext: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#9F9D9D",
  },

  imagecontainers: {
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
    marginTop: 20,
  },

  imagecontainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#9F9D9D",
    padding: 7,
  },

  image: {
    width: 20,
    height: 20,
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
