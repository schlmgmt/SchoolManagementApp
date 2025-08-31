import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Import Home screen
import Home from "./home";

function StudentsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>📚 Students Page</Text>
    </View>
  );
}

function AttendanceScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>✅ Attendance Page</Text>
    </View>
  );
}

function ExamsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🎓 Exams Page</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: "#2575fc" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 15 }}>
              <Ionicons name="person-circle-outline" size={28} color="#fff" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home-outline";
            else if (route.name === "Students") iconName = "people-outline";
            else if (route.name === "Attendance") iconName = "checkmark-done-outline";
            else if (route.name === "Exams") iconName = "school-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2575fc",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Students" component={StudentsScreen} />
        <Tab.Screen name="Attendance" component={AttendanceScreen} />
        <Tab.Screen name="Exams" component={ExamsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
