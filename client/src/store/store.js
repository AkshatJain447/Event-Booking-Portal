import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../store/hotelSlice";
import userReducer from "../store/userAuthSlice";

export const store = configureStore({
  reducer: {
    hotels: hotelReducer,
    user: userReducer,
  },
});
