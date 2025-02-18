import { Text, View, StyleSheet } from "react-native";
import InputBox from "@/components/inputBox";

export default function Login() {
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
        <InputBox title="Username" type="username" />
        <InputBox title="Password" type="password" />
      </View>
      <View style={styles.separatorcontainer}>
        <View style={styles.orline} />
        <Text style={styles.ortext}>or</Text>
        <View style={styles.orline} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
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
});
