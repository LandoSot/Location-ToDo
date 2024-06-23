import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/Location";

const Store = configureStore({
  reducer: {
    location: locationReducer
  }
})

export default Store
