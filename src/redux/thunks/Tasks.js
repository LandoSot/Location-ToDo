import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'
import { getCurrentLocation, startBgTask } from "../../tools/LocationTools";
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
        activationTimestamp: null,
        notificated: false
      }

      const updatedWholeTasks = [...wholeTasks]
      updatedWholeTasks.push(taskParams)

      await AsyncStorage.setItem('wholeTasks', JSON.stringify(updatedWholeTasks))
      navigation.navigate('Dashboard')
      Alert.alert('Nueva Tarea', 'La nueva tarea a sido registrada exitosamente')

      startBgTask()
      return updatedWholeTasks

    } catch (error) {
      console.error('Error al agregar la tarea:', error.message)
      return rejectWithValue({})
    }
  }
)

export const GetTasks_Thunk = createAsyncThunk(
  'location/getTasks',
  async (props, { rejectWithValue }) => {
    try {
      const wholeTasks = JSON.parse(await AsyncStorage.getItem('wholeTasks')) || []
      const completedTasks = wholeTasks.filter(eachTask => eachTask.status == "done")
      const pendingTasks = wholeTasks.filter(eachTask => eachTask.status == "pending")

      return {
        completedTasks,
        pendingTasks,
        wholeTasks
      }
    } catch (error) {
      console.error('Error obtener las tareas:', error.message)
      return rejectWithValue({})
    }
  }
)

export const UpdateTasks_Thunk = createAsyncThunk(
  'location/updateTasks',
  async (props, { rejectWithValue, getState }) => {
    try {
      const { location: { wholeTasks } } = getState()
      const { newPendingTasks } = props;
      const updatedTasksMap = new Map(newPendingTasks.map(task => [task.taskId, task]));

      const updatedWholeTasks = wholeTasks.map(task =>
        updatedTasksMap.has(task.taskId)
          ? { ...task, ...updatedTasksMap.get(task.taskId) }
          : task
      );

      await AsyncStorage.setItem('wholeTasks', JSON.stringify(updatedWholeTasks))

      return {
        wholeTasks: updatedWholeTasks,
        pendingTasks: newPendingTasks
      }
    } catch (error) {
      console.error('Error actualizar las tareas:', error.message)
      return rejectWithValue({})
    }
  }
)

export const ToggleTaskStatus_Thunk = createAsyncThunk(
  'location/taskStatus',
  async (props, { rejectWithValue, getState }) => {
    try {
      const { task, action } = props
      const { location: { wholeTasks } } = getState()

      const updatedWholeTasks = wholeTasks.map(eachTask => {
        if (eachTask.taskId == task.taskId) {
          console.log('ENTRO AL IF')
          return {
            ...eachTask,
            status: action == 'complete' ? 'done' : 'pending',
            notificated: action == 'complete' ? true : false,
            activationTimestamp: action == 'complete' ? eachTask.activationTimestamp : null,
          }
        } else {
          return eachTask
        }
      })

      const completedTasks = updatedWholeTasks.filter(eachTask => eachTask.status == "done")
      const pendingTasks = updatedWholeTasks.filter(eachTask => eachTask.status == "pending")

      await AsyncStorage.setItem('wholeTasks', JSON.stringify(updatedWholeTasks))

      return { pendingTasks, completedTasks, updatedWholeTasks }
    } catch (error) {
      console.error('Error ToggleTaskStatus_Thunk:', error.message)
      return rejectWithValue({})
    }
  }
)
