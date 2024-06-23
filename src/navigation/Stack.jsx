import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Dashboard";
import NewTask from "../screens/tasks/NewTask";
import MapTaskLocation from "../screens/tasks/MapPicker";

const Stack = createStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerTitle: "Location ToDo", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="NewTask"
        component={NewTask}
        options={{ headerTitle: "Nueva Tarea", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="MapTaskLocation"
        component={MapTaskLocation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default DashboardStack
