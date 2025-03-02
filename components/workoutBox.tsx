import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import api from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

interface WorkoutBoxProps {
  workout: {
    _id: string;
    name: string;
    notes: string;
    exercises: any[];
  };
}

export default function WorkoutBox({ workout }: WorkoutBoxProps) {
  const [workoutsDone, setWorkoutsDone] = useState<{ time: number }[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<any[]>([]);

  useEffect(() => {
    const fetchWorkoutsDone = async () => {
      try {
        const response = await api.get("/workouts-done/user");
        setWorkoutsDone(response.data.workoutsDone || []);
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setWorkoutsDone([]);
      }
    };
    const fetchWorkoutExercises = async () => {
      try {
        const response = await api.get(`/workouts/${workout._id}/exercises`);
        setWorkoutExercises(response.data.exercises || []);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setWorkoutExercises([]);
      }
    };
    fetchWorkoutsDone();
    fetchWorkoutExercises();
    console.log("exercises:", workoutExercises);
    console.log("workout:", workout);
  }, []);

  const averageTime = () => {
    const last10Workouts = workoutsDone?.slice(-10) ?? [];
    if (last10Workouts.length === 0) return "-";

    let totalTime = 0;
    last10Workouts.forEach((workoutDone) => {
      totalTime += workoutDone.time;
    });

    const roundedValue = Math.round(totalTime / last10Workouts.length);
    const hours = Math.floor(roundedValue / 60);
    const minutes = roundedValue % 60;
    return `${hours}h ${minutes}m`;
  };

  const lastWorkout = () => {
    if (workoutsDone.length === 0) return "-";
    const lastWorkout = workoutsDone[workoutsDone.length - 1];
    const date = new Date(lastWorkout.time);
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <Text style={styles.title}>Back and Shoulders</Text>
        <TouchableOpacity>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middlecontainer}>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseText}>Nº Exercises</Text>
          <Text style={styles.exerciseInfo}>
            {workout.exercises?.length ?? 0}
          </Text>
        </View>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseText}>Average Time</Text>
          <Text style={styles.exerciseInfo}>{averageTime()}</Text>
        </View>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseText}>Last workout was in </Text>
          <Text style={styles.exerciseInfo}>{lastWorkout()}</Text>
        </View>
      </View>
      <View style={styles.bottomcontainer}>
        {workoutExercises.map((exercise) => (
          <Image
            key={exercise._id}
            source={{ uri: exercise.image }}
            style={{ width: 30, height: 30 }}
          />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 1,
    borderColor: "#9F9D9D",
    padding: 10,
    width: "80%",
    borderRadius: 10,
  },

  topcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
  },

  buttonText: {
    fontFamily: "Roboto-Bold",
    fontSize: 12,
    color: "#1E90FF",
    justifyContent: "flex-end",
  },

  middlecontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  exerciseContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  exerciseText: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: "#9F9D9D",
  },

  exerciseInfo: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  },

  bottomcontainer: {
    flexDirection: "row",
    gap: 10,
  },
});
