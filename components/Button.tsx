import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native";

interface InputButtonProps {
  title: string;
  onPress: () => void;
  variant?: "first" | "second" | "third";
  color?: "primary" | "secondary";
  border?: boolean;
  clickable?: boolean;
  error?: boolean;
  loading?: boolean;
  errorMessage?: string;
}

export default function Button({
  title,
  onPress,
  variant = "first",
  color = "primary",
  clickable = true,
  error = false,
  loading = false,
  errorMessage,
}: InputButtonProps) {
  const buttonStylesArray = [
    styles.baseButton,
    styles[`variant_${variant}`],
    styles[`color_${color}`],
    !clickable && styles.disabled,
    error && styles.error,
  ];

  const textStylesArray = [
    styles[`textcolor_${color}`],
    styles[`textvariant_${variant}`],
  ];

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <TouchableOpacity
        style={buttonStylesArray}
        onPress={clickable ? onPress : undefined}
        disabled={!clickable}
      >
        {loading ? (
          <ActivityIndicator
            color={color === "primary" ? "#FFFFFF" : "#1E90FF"}
          />
        ) : (
          <Text style={textStylesArray}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  baseButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  variant_first: {
    width: 280,
    height: 55,
    borderRadius: 10,
  },

  variant_second: {
    width: 200,
    height: 36,
    borderRadius: 10,
  },

  variant_third: {
    width: 55,
    height: 18,
    borderRadius: 6,
  },

  color_primary: {
    backgroundColor: "#1E90FF",
  },

  color_secondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#1E90FF",
  },

  textcolor_primary: {
    color: "#FFFFFF",
    fontFamily: "Roboto-SemiBold",
  },

  textcolor_secondary: {
    color: "#1E90FF",
    fontFamily: "Roboto-SemiBold",
  },

  textvariant_first: {
    fontSize: 18,
  },

  textvariant_second: {
    fontSize: 16,
  },

  textvariant_third: {
    fontSize: 8,
  },

  disabled: {
    backgroundColor: "#A0D0FE",
  },

  error: {
    backgroundColor: "#FF3333",
  },

  errorMessage: {
    color: "#FF3333",
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    marginBottom: 5,
  },
});
