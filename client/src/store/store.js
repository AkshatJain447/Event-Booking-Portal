import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../store/hotelSlice";

export const store = configureStore({
  reducer: {
    hotels: hotelReducer,
  },
});
