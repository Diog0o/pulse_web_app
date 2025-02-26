import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function MonthlyStatistics() {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.title}>Your monthly training sessions</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.subLowerContainer}>
            <Text style={styles.subtitle}>Sessions</Text>
            <Text style={styles.infoText}>14</Text>
        </View>
        <View style={styles.subLowerContainer}>
            <Text style={styles.subtitle}>Time</Text>
            <Text style={styles.infoText}>6:32h</Text>
        </View>
        <View style={styles.subLowerContainer}>
            <Text style={styles.subtitle}>Streak</Text>
            <Text style={styles.infoText}>5 days</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 10,
  },

  upperContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  title: {
    fontSize: 12,
    fontFamily: "Roboto-Bold",
    flex: 1,
  },

  seeMore: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: "#1E90FF",
  },

  lowerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  subLowerContainer: {
    gap: 6
  },

  subtitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
  },

  infoText: {
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  }
});
