import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import api from "../../../utils/axiosInstance";
import WorkoutBox from "@/components/workoutBox";

export default function WorkoutsScreen() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<
    { _id: string; name: string; notes: string; exercises: any[] }[]
  >([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await api.get("/workouts/user");
      console.log(response.data.workouts);
      setWorkouts(response.data.workouts);
    };
    fetchWorkouts();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {workouts ? (
        <>
          {workouts.map((workout) => (
            <WorkoutBox key={workout._id} workout={workout} />
          ))}
        </>
      ) : (
        <>
          <Text>You have no workouts yet.</Text>
          <Button title="Create Workout" />
        </>
      )}
    </View>
  );
}
