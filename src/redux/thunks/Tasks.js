import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'
import { getCurrentLocation } from "../../tools/location";
import { Alert } from "react-native";

export const AddTask_Thunk = createAsyncThunk(
  'location/addTask',
  async (props, { rejectWithValue, getState }) => {
    try {
      const { values, navigation } = props
      const currentLocation = await getCurrentLocation()
      const { location: { taskLocation, wholeTasks } } = getState()
      const taskParams = {
        ...values,
        latitude: taskLocation.latitude || currentLocation.latitude,
        longitude: taskLocation.longitude || currentLocation.longitude,
        taskId: uuidv4(),
        status: 'pending',
        activationTimestamp: null
      }

      const updatedWholeTasks = [...wholeTasks]
      updatedWholeTasks.push(taskParams)

      await AsyncStorage.setItem('wholeTasks', JSON.stringify(updatedWholeTasks))
      navigation.navigate('Dashboard')
      Alert.alert('Nueva Tarea', 'La nueva tarea a sido registrada exitosamente')

      return updatedWholeTasks

    } catch (error) {
      console.error('Error al agregar la tarea:', error.message)
      return rejectWithValue({})
    }
  }
)