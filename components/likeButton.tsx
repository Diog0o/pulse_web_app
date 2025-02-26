import { Text, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LikeButtonProps {
  post_id: string;
}

export default function LikeButton({ post_id }: LikeButtonProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/likes/${post_id}`
        );
        console.log("Aqui")
        console.log(response.data);
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching likes");
      }
    };
    fetchLikes();
  }, []);

  const onLikePress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/likes",
        { post_id: post_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Aquiiii")
      console.log(response.data);
      setLiked(true);
      setLikes((props) => props + 1);
    } catch (error) {
      Alert.alert("Error", "An error occurred while liking the post");
    }
  };

  const onUnlikePress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.delete(
        "http://localhost:3000/api/likes?post_id=" + post_id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setLiked(false);
      setLikes((props) => props - 1);
    } catch (error) {
      Alert.alert("Error", "An error occurred while unliking the post");
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name={liked ? "heart" : "heart-outline"}
        size={24}
        color={liked ? "red" : "black"}
        onPress={liked ? onUnlikePress : onLikePress}
      />
      <Text style={styles.text}>{likes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },
});
