import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  currentLocation: {
    longitude: 0,
    latitude: 0
  }
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
      state.isLoading = false;
    }
  },
  // extraReducers(builder) {
  //   builder
  // }
})

export const selectLocation = state => state.location
export default locationSlice.reducer

export const {
  setCurrentLocation
} = locationSlice.actions
