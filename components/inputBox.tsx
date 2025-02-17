import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface InputBoxProps {
  title: string;
  type: "username" | "password";
  hidden?: boolean;
  error?: boolean;
}

export default function InputBox({
  title,
  type = "username",
  hidden = false,
}: InputBoxProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [min8, setMin8] = useState(false);
  const [min1Upper, setMin1Upper] = useState(false);
  const [min1Number, setMin1Number] = useState(false);
  const [min1Special, setMin1Special] = useState(false);

  const validatePassword = (text: string) => {
    setValue(text);
    setMin8(text.length >= 8);
    setMin1Upper(/[A-Z]/.test(text));
    setMin1Number(/[0-9]/.test(text));
    setMin1Special(/[!@#$%^&*(),.?":{}|<>]/.test(text));
  }


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={
            type === "username" ? "Enter your username" : "Enter your password"
          }
          secureTextEntry={hidden}
          value={value}
          onChangeText={setValue}
        />
      </View>
      <View>
        <View>
          <Ionicons name="checkmark-outline" size={12} color="#1E90FF" style={{opacity: min8 ? 1 : 0.4 }} />
          <Text style={styles.text}>Min. 8 letters</Text>
        </View>
        <View>

        </View>
        <View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 5,
  },

  title: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: "#1E90FF",
  },

  input: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },

  text: {
    fontFamily: "Roboto-Regular",
    
  }
});
