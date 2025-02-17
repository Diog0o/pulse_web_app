import { View, Text, StyleSheet } from "react-native";

export default function Loading(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>PULSE</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1E90FF"
    },

    text: {
        fontSize: 56,
        color: "#FFFFFF",
        fontFamily: "Anton"
    }
})