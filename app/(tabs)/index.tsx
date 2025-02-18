import { View, Text, StyleSheet } from "react-native";
import InputBox from "../../components/inputBox";

export default function Home() {
  return (
    <View style={styles.container}>
      <InputBox title="Password" type="password"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    margin: 20
  }
})