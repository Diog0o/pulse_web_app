import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          header: () => <CustomHomeHeader />,
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
          headerShown: false,
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
          header: () => null,
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
          header: () => <CustomGroupHeader />,
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
          header: () => <CustomProfileHeader />,
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
const CustomHomeHeader = () => {
  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity style={styles.upgradebutton}>
          <Text style={styles.buttontitle}>UPGRADE TO PREMIUM</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navCenterHome}>
        <Text style={styles.title}>PULSE</Text>
      </View>
      <View style={styles.navRightHome}>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="mail-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const CustomWorkoutHeader = ({ variant }: { variant: number }) => {
  return (
    <View style={styles.header}>
      <View style={styles.navLeftWorkout}>
        <TouchableOpacity>
          {variant === 1 ? (
            <Ionicons name="person-circle-outline" size={24} />
          ) : (
            <Text style={styles.greyText}>Close</Text>
          )}
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>WORKOUTS</Text>
      </View>
      <View style={styles.navRightWorkout}>
        <TouchableOpacity>
          {variant === 3 ? (
            <Ionicons name="settings-outline" size={24} />
          ) : (
            <Text style={styles.greyText}>Done</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CustomGroupHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.navLeftGroup}>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>GROUPS</Text>
      </View>
      <View style={styles.navRightGroup}>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CustomProfileHeader = () => {
  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={24} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>PROFILE</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 95,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
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

  navCenterHome: {
    flex: 1,
    alignItems: "center",
  },

  navRightHome: {
    flexDirection: "row",
    width: 100,
    justifyContent: "space-between",
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
    fontSize: 28,
    fontFamily: "Anton-Regular",
  },

  navLeftWorkout: {
    width: 36,
  },

  navRightWorkout: {
    width: 36,
  },

  greyText: {
    fontFamily: "Roboto-Regular",
    color: "#817F7F",
    fontSize: 14,
  },

  navRightGroup: {
    flexDirection: "row",
    width: 75,
    justifyContent: "space-between",
  },

  navLeftGroup: {
    width: 75,
  }
});
