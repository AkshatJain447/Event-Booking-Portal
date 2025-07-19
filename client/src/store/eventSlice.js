import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "eventData",
  initialState: {
    isEvent: false,
    name: "",
    date: "",
    duration: 1,
    catererVendor: "",
    decoratorVendor: "",
    djVendor: "",
    roomHotel: null,
    hallHotel: null,
    totalPrice: 0,
  },
  reducers: {
    setIsEvent: (state, action) => {
      state.isEvent = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setCatererVendor: (state, action) => {
      state.catererVendor = action.payload;
    },
    setDecoratorVendor: (state, action) => {
      state.decoratorVendor = action.payload;
    },
    setDJVendor: (state, action) => {
      state.djVendor = action.payload;
    },
    setRoomHotel: (state, action) => {
      state.roomHotel = action.payload;
    },
    setHallHotel: (state, action) => {
      state.hallHotel = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const {
  setIsEvent,
  setName,
  setDate,
  setDuration,
  setCatererVendor,
  setDecoratorVendor,
  setDJVendor,
  setRoomHotel,
  setHallHotel,
  setTotalPrice,
} = eventSlice.actions;

export default eventSlice.reducer;
