import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LikeButton from "./likeButton";
import CommentButton from "./commentButton";
import SendButton from "./sendButton";
import axios from "axios";
const map_img = require("../assets/images/map.png");
const dumbell_img = require("../assets/images/gym.png");

interface PostProps {
  user_id: string;
  post_id: string;
}

export default function Post({ post_id }: PostProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Ionicons name="person-circle" size={30} color="black" />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.name}>Diogo Guerreiro</Text>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Image source={dumbell_img} style={{ width: 14, height: 14 }} />
            <Text style={styles.location}>
              16 novembro de 2024 às 19:08 • Lisboa
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.detailsText}>See full details</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Morning Workout</Text>
      <View style={styles.infoContainer}>
        <View style={styles.subMiddleContainer}>
          <Text style={styles.infoTitle}>Time</Text>
          <Text style={styles.infoSubtitle}>1:05h</Text>
        </View>
        <View style={styles.subMiddleContainer}>
          <Text style={styles.infoTitle}>Exercises</Text>
          <Text style={styles.infoSubtitle}>4</Text>
        </View>
        <View style={styles.subMiddleContainer}>
          <Text style={styles.infoTitle}>Muscle Group Trained </Text>
          <Text style={styles.infoSubtitle}>Bicep and Back</Text>
        </View>
      </View>
      <Image
        source={map_img}
        style={{ width: "100%", height: 183 }}
        resizeMode="cover"
      />
      <View style={styles.lowerContainer}>
        <LikeButton post_id="67bf14db234347a6ea2787b4" />
        <CommentButton post_id="67bf14db234347a6ea2787b4" />
        <SendButton post_id="67bf14db234347a6ea2787b4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },

  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 12,
  },

  location: {
    fontFamily: "Roboto-Light",
    fontSize: 10,
  },

  detailsText: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: "#1E90FF",
  },

  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    width: "90%",
  },

  subMiddleContainer: {
    gap: 6,
  },

  infoTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },

  infoSubtitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  },

  lowerContainer: {
    flexDirection: "row",
    gap: 30,
    marginTop: 10,
  }
});
