import { Text, View, StyleSheet, Alert, Image } from "react-native";
import { useEffect, useState } from "react";
const send_img = require("../assets/images/send.png");

interface SendButtonProps {
  post_id: string;
}

export default function SendButton({ post_id }: SendButtonProps) {
  return (
    <View style={styles.container}>
      <Image source={send_img} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  image: {
    width: 20,
    height: 20,
  }
});
