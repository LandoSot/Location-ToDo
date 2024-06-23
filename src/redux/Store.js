import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/LocationSlice";

const Store = configureStore({
  reducer: {
    location: locationReducer
  }
})

export default Store
