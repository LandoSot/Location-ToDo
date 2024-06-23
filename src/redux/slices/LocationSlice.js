import { createSlice } from "@reduxjs/toolkit";
import { AddTask_Thunk, GetTasks_Thunk, ToggleTaskStatus_Thunk, UpdateTasks_Thunk } from "../thunks/Tasks";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from 'uuid'
import { getCurrentLocation } from "../../tools/LocationTools";
import { Alert } from "react-native";


const initialState = {
  loadingMap: true,
  isLoading: false,
  taskCoords: false,
  wholeTasks: [],
  pendingTasks: [],
  completedTasks: [],
  currentLocation: {
    longitude: 0,
    latitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  taskLocation: {
    longitude: null,
    latitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      Object.assign(state.currentLocation, action.payload);
      state.loadingMap = false;
    },
    setTaskLocation: (state, action) => {
      Object.assign(state.taskLocation, action.payload);
      state.taskCoords = true;
    },
    resetTaskLocation: (state) => {
      state.taskLocation = initialState.taskLocation
      state.taskCoords = initialState.taskCoords
    }
  },
  extraReducers(builder) {
    builder
      .addCase(AddTask_Thunk.pending, state => {
        state.isLoading = true
      })
      .addCase(AddTask_Thunk.fulfilled, (state, action) => {
        state.wholeTasks = action.payload
        state.isLoading = false
      })
      .addCase(AddTask_Thunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(GetTasks_Thunk.pending, state => {
        state.isLoading = true
      })
      .addCase(GetTasks_Thunk.fulfilled, (state, action) => {
        state.completedTasks = action.payload.completedTasks
        state.pendingTasks = action.payload.pendingTasks
        state.wholeTasks = action.payload.wholeTasks
        state.isLoading = false
      })
      .addCase(GetTasks_Thunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(UpdateTasks_Thunk.pending, state => {
        state.isLoading = true
      })
      .addCase(UpdateTasks_Thunk.fulfilled, (state, action) => {
        state.pendingTasks = action.payload.pendingTasks
        state.wholeTasks = action.payload.wholeTasks
        state.isLoading = false
      })
      .addCase(UpdateTasks_Thunk.rejected, state => {
        state.isLoading = false
      })
      .addCase(ToggleTaskStatus_Thunk.pending, state => {
        state.isLoading = true
      })
      .addCase(ToggleTaskStatus_Thunk.fulfilled, (state, action) => {
        state.completedTasks = action.payload.completedTasks
        state.pendingTasks = action.payload.pendingTasks
        state.wholeTasks = action.payload.updatedWholeTasks
        state.isLoading = false
      })
      .addCase(ToggleTaskStatus_Thunk.rejected, state => {
        state.isLoading = false
      })
  }
})

export const selectLocation = state => state.location
export default locationSlice.reducer

export const {
  setCurrentLocation,
  setTaskLocation,
  resetTaskLocation
} = locationSlice.actions
