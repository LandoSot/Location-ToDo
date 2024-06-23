import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Dashboard";
import NewTask from "../screens/tasks/NewTask";
import MapTaskLocation from "../screens/tasks/MapPicker";
import PendingList from "../screens/lists/PedingList";
import DoneList from "../screens/lists/DoneList";
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { dispatchNotification } from "../tools/LocationTools";

const Stack = createStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () =>
          <TouchableOpacity onPress={() => dispatchNotification({ distance: 100, name: 'Notificación de Prueba' })}>
            <FontAwesome name="send" size={24} color="black" style={{ marginRight: '10%' }} />
          </TouchableOpacity>
      }}
    >
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
      <Stack.Screen
        name="PendingTasks"
        component={PendingList}
        options={{ headerTitle: "Tareas Pendientes", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="DoneList"
        component={DoneList}
        options={{ headerTitle: "Tareas Completadas", headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  )
}

export default DashboardStack
