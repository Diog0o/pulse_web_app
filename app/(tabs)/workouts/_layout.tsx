import { Stack } from "expo-router";

export default function WorkoutsLayout() {

    return (
        <Stack>
        <Stack.Screen name="index" options={{ title: "Workouts" }} />
        <Stack.Screen name="create" options={{ title: "Create Workout" }} />
        </Stack>
    );
}