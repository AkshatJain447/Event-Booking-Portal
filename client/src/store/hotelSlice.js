import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: [],
    loading: false,
    hotelCount: 0,
  },
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHotelCount: (state, action) => {
      state.hotelCount = action.payload;
    },
  },
});

export default hotelSlice.reducer;
export const { setHotels, setLoading, setHotelCount } = hotelSlice.actions;
