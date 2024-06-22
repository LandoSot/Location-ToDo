import { configureStore } from "@reduxjs/toolkit";
import LocationSlice from "./slices/Location";

const Store = configureStore({
  reducer: {
    location: LocationSlice
  }
})

export default Store
