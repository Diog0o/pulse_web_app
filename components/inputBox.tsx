import { Text, View, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

interface InputBoxProps {
  title: string;
  type: "email" | "password" | "username";
  hidden?: boolean;
  onChangeText?: (text: string, validationState?: any) => void;
  verifications?: boolean;
}

export default function InputBox({ title, type = "email", onChangeText, verifications= false }: InputBoxProps) {
  const [value, setValue] = useState("");
  const [hidden, setHidden] = useState(true);
  const [min8, setMin8] = useState(false);
  const [min1Upper, setMin1Upper] = useState(false);
  const [min1Number, setMin1Number] = useState(false);
  const [min1Special, setMin1Special] = useState(false);

  const validatePassword = (text: string) => {

    //Calcular primeiro e guardar em constantes para atualizar logo
    const min8 = text.length >= 8;
    const min1Upper = /[A-Z]/.test(text);
    const min1Number = /[0-9]/.test(text);
    const min1Special = /[!@#$%^&*(),.?":{}|<>]/.test(text);

    setMin8(min8);
    setMin1Upper(min1Upper);
    setMin1Number(min1Number);
    setMin1Special(min1Special);

    if (onChangeText) {
        onChangeText(text, { min8, min1Upper, min1Number, min1Special });
      }
  };

  useEffect(() => {
    if (type === "password") {
      validatePassword(value);
    }
    else{
        if (onChangeText){
            onChangeText(value);
        }
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
            type === "email"
              ? "Enter your email"
              : type === "password"
              ? "Enter your password"
              : "Enter your username"
          }
          secureTextEntry={ type === "password" && hidden}
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
      {type === "password" && verifications && (
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
