import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          header: () => <CustomHeader title="Home" />,
          tabBarLabel: "HOME",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="workouts"
        options={{
          headerTitle: "Workouts",
          tabBarLabel: "WORKOUTS",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "barbell-sharp" : "barbell-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="start"
        options={{
          headerTitle: "Start",
          tabBarLabel: "START",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "add-circle-sharp" : "add-circle-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="groups"
        options={{
          headerTitle: "Groups",
          tabBarLabel: "GROUPS",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "people-sharp" : "people-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarLabel: "PROFILE",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person-sharp" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const CustomHeader = ({ title }: { title: String }) => {
  switch (title) {
    case "Home":
      return (
        <View style={styles.header}>
          <View style={styles.navLeft}>
            <TouchableOpacity style={styles.upgradebutton}>
              <Text style={styles.buttontitle}>UPGRADE TO PREMIUM</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navCenter}>
            <Text style={styles.title}>PULSE</Text>
          </View>
          <View style={styles.navRight}>
            <Ionicons name="search-outline" size={24} color="black" />
            <Ionicons name="mail-outline" size={24} color="black" />
            <Ionicons name="notifications" size={24} color="black" />
          </View>
        </View>
      );
    case "Workouts":
      return (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    case "Start":
      return (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    case "Groups":
      return (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    case "Profile":
      return (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    height: 110,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  navLeft: {
    flex: 2.5,
    justifyContent: "space-around",
    flexDirection: "row",
  },

  navCenter: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  navRight: {
    flex: 2.5,
    justifyContent: "space-around",
    flexDirection: "row",
  },

  upgradebutton: {
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
  },

  buttontitle: {
    fontSize: 10,
    fontFamily: "Anton",
  },

  title: {
    color: "#1E90FF",
    fontSize: 36,
    fontFamily: "Anton-Regular",
  },
});
