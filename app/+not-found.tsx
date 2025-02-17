import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{title: "Not Found"}}/>
      <View style={styles.conatiner}>
        <Text style={styles.text}>Error 404! Page Not found</Text>
        <Link href={"/"} style={styles.button}>Return to home Page</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#25292e"
    },

    text: {
        color: "white"
    },

    button: {
        fontSize: 20,
        color: "white",
        textDecorationLine: "underline"
    }

})
