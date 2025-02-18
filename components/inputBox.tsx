import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

interface InputBoxProps {
  title: string;
  type: "username" | "password";
  hidden?: boolean;
  onChangeText?: (text: string) => void;
}

export default function InputBox({ title, type = "username", onChangeText }: InputBoxProps) {
  const [value, setValue] = useState("");
  const [hidden, setHidden] = useState(true);
  const [min8, setMin8] = useState(false);
  const [min1Upper, setMin1Upper] = useState(false);
  const [min1Number, setMin1Number] = useState(false);
  const [min1Special, setMin1Special] = useState(false);

  const validatePassword = (text: string) => {
    setValue(text);
    if (onChangeText){
        onChangeText(text);
    }
    setMin8(text.length >= 8);
    setMin1Upper(/[A-Z]/.test(text));
    setMin1Number(/[0-9]/.test(text));
    setMin1Special(/[!@#$%^&*(),.?":{}|<>]/.test(text));
  };

  useEffect(() => {
    if (type === "password") {
      validatePassword(value);
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder={
            type === "username" ? "Enter your username" : "Enter your password"
          }
          secureTextEntry={ type === "username" ? false :  hidden}
          value={value}
          onChangeText={setValue}
        />
        {type=== "password" && <Ionicons
          name={hidden ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="#1E90FF"
          style={styles.icon}
          onPress={() => setHidden(!hidden)}
        />}
      </View>
      {type === "password" && (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              maxWidth: 280,
            }}
          >
            <View style={styles.validation}>
              <Ionicons
                name="checkmark-outline"
                size={16}
                color="#1E90FF"
                style={{ opacity: min8 ? 1 : 0.2 }}
              />
              <Text style={styles.text}>Min. 8 letters</Text>
            </View>
            <View style={styles.validation}>
              <Ionicons
                name="checkmark-outline"
                size={16}
                color="#1E90FF"
                style={{ opacity: min1Upper ? 1 : 0.2 }}
              />
              <Text style={styles.text}>Min. 1 upper case</Text>
            </View>
            <View style={styles.validation}>
              <Ionicons
                name="checkmark-outline"
                size={16}
                color="#1E90FF"
                style={{ opacity: min1Special ? 1 : 0.2 }}
              />
              <Text style={styles.text}>Min. 1 special character</Text>
            </View>
          </View>
          <View style={styles.validation}>
            <Ionicons
              name="checkmark-outline"
              size={16}
              color="#1E90FF"
              style={{ opacity: min1Number ? 1 : 0.2 }}
            />
            <Text style={styles.text}>Min. 1 number</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignSelf: "center",
  },

  title: {
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    color: "#1E90FF",
  },

  inputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  input: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    borderRadius: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    marginTop: 5,
    marginBottom: 5,
    width: 280,
    height: 47,
  },

  icon: { 
    alignItems: "center", 
    position: "absolute", 
    right: 20 
},

  text: {
    fontFamily: "Roboto-Light",
    fontSize: 9,
    color: "#9F9D9D",
    marginRight: 2,
  },

  validation: {
    flexDirection: "row",
    alignItems: "center",
  },
});
