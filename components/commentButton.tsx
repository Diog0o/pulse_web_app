import { Text, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";

interface CommentButtonProps {
  post_id: string;
}

export default function CommentButton({ post_id }: CommentButtonProps) {
  const [comments, setComments] = useState<number>(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/comments/${post_id}`
        );
        setComments(response.data.length);
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching comments");
      }
    };
    fetchComments();
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="chatbox-outline" size={24} color="black" />
      <Text style={styles.text}>{comments}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 12
  },
});
