import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const workout_img = require("../../../assets/images/workout-guy.png");

export default function CreateWorkout() {
  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <Ionicons name="add-circle-outline" size={24} color="#000" />
      </View>
      <View style={styles.bottomcontainer}>
        <Image source={workout_img} style={styles.image} />
        <Text style={styles.title}>Create your first workout</Text>
        <Text style={styles.subTitle}>
          Create your own or import <Text style={styles.bluetext }>Workouts</Text> from other users
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topcontainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },

  bottomcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },

  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },

  title: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    marginTop: 10,
  },

  subTitle: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#9F9D9D",
    textAlign: "center",
    marginTop: 10,
    width: 200
  },

  bluetext: {
    color: "#1E90FF",
    fontFamily: "Roboto-Regular",
  },
});
