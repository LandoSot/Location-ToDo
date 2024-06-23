import * as Location from "expo-location"
import * as TaskManager from "expo-task-manager"
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from "expo-constants";
import * as Geolib from 'geolib'
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import { Platform } from "react-native";

const LOCATION_TASK_NAME = "background-location-task"

export async function requestLocationPermissions() {
  let token;
  const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
  const { status: notificationStatus } = await Notifications.requestPermissionsAsync();

  if (locationStatus != "granted") {
    console.log("Permisos de Ubicación", "Permisos de ubicación no otorgados, imposible visualizar ubicación en mapa");
    return;
  }
  if (notificationStatus !== 'granted') {
    console.error('Permiso de notificaciones denegado');
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    }),
  });

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    if (Constants.easConfig?.projectId) {
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.easConfig.projectId, // you can hard code project id if you dont want to use expo Constants
        })
      ).data;
      console.log(token);
    }
  }
}

export async function getCurrentLocation() {
  await requestLocationPermissions()
  const location = await Location.getCurrentPositionAsync();
  const coords = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  }

  return coords
}

export async function setForegroundTracking(location) {
  try {
    let updateTasks = false
    const newPendingTasks = []
    const { latitude, longitude } = location.coords
    const wholeTasks = JSON.parse(await AsyncStorage.getItem('wholeTasks')) || []
    const pendingTasks = wholeTasks.filter(eachTask => eachTask.status == "pending")

    if (pendingTasks.length) {
      for (const task of pendingTasks) {
        const distanceInMetters = Geolib.getDistance(
          { latitude, longitude },
          { latitude: task.latitude, longitude: task.longitude }
        )

        // console.log(`distanceInMetters task ${task.name}: ${distanceInMetters} mts`)
        if (distanceInMetters <= task.distance && !task.notificated) {
          updateTasks = true;
          dispatchNotification(task);

          newPendingTasks.push({
            ...task,
            notificated: true,
            status: 'done',
            activationTimestamp: moment().format("DD/MM/YYYY HH:mm")
          });
        } else {
          newPendingTasks.push(task)
        }
      }
    }

    return { updateTasks, newPendingTasks }
  } catch (error) {
    console.log('Error:', error.message)
  }
}

export async function setBackgroundTracking() {
  try {
    const wholeTasks = JSON.parse(await AsyncStorage.getItem('wholeTasks')) || []
    const pendingTasks = wholeTasks.filter(eachTask => eachTask.status == "pending")

    const isBgTaskRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME)
    console.log('isBgTaskRegistered:', isBgTaskRegistered)
    console.log('pendingTasks.length:', pendingTasks.length)

    if (!pendingTasks.length && isBgTaskRegistered) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log('>>> Background Tracking Removed')
    } else {
      await startBgTask()
    }
  } catch (error) {
    console.log('Error setBackgroundTracking:', error.message)
  }
}

export async function startBgTask() {
  try {
    const isBgTaskRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME)
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

    if (backgroundStatus !== 'granted') {
      console.error('Permisos de ubicación en segundo plano no otorgados');
      return;
    }

    if (!isBgTaskRegistered) {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 1, // Actualiza cada metro
        deferredUpdatesInterval: 1000, // Actualiza cada segundo
        showsBackgroundLocationIndicator: false, // No muestra indicador en primer plano
        pausesUpdatesAutomatically: true, // Pausa automáticamente en primer plano
      })
        .then(() => console.log('>>> Background Tracking Registered'))
    }
  } catch (error) {
    console.log('Error startBgTask:', error.message)
  }
}

export async function dispatchNotification(task, origin = "foreground") {
  try {
    console.log('>>>>>>> Dispatch notification')

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `¡Estás cerca! (${origin})`,
        body: `Te encuentras a menos de ${task.distance} metros de la tarea ${task.name}`,
        sound: true
      },
      trigger: null,
    });
  } catch (error) {
    console.log('Error setForegroundTracking:', error.message)
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('TaskManager:', error)
    return
  }

  if (data) {
    let updateTasks
    const newPendingTasks = []
    const { locations } = data
    const { coords } = locations[0]
    const wholeTasks = JSON.parse(await AsyncStorage.getItem('wholeTasks')) || []
    const pendingTasks = wholeTasks.filter(eachTask => eachTask.status == "pending")

    if (pendingTasks.length) {
      for (const task of pendingTasks) {
        const distanceInMetters = Geolib.getDistance(
          { latitude: coords.latitude, longitude: coords.longitude },
          { latitude: task.latitude, longitude: task.longitude }
        )

        if (distanceInMetters <= task.distance && !task.notificated) {
          updateTasks = true;
          dispatchNotification(task, 'background');

          newPendingTasks.push({
            ...task,
            notificated: true,
            status: "done",
            activationTimestamp: moment().format("DD/MM/YYYY HH:mm")
          });
        } else {
          newPendingTasks.push(task)
        }
      }
    }

    if (updateTasks) {
      const updatedTasksMap = new Map(newPendingTasks.map(task => [task.taskId, task]));

      const updatedWholeTasks = wholeTasks.map(task =>
        updatedTasksMap.has(task.taskId)
          ? { ...task, ...updatedTasksMap.get(task.taskId) }
          : task
      );

      await AsyncStorage.setItem('wholeTasks', JSON.stringify(updatedWholeTasks))
    }
  }
})
