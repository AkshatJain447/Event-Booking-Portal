import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../store/hotelSlice";
import userReducer from "../store/userAuthSlice";
import eventReducer from "../store/eventSlice";

export const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    user: userReducer,
    event: eventReducer,
  },
});
