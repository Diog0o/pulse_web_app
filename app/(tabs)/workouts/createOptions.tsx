import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

export default function createOptions () {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text>Choose your workout</Text>
            <Button title="CREATE" onPress={() => router.push("/")}/>
            <Button title="IMPORT" onPress={() => router.push("/")}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {

    }
})