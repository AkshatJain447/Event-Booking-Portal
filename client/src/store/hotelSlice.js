import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: [],
    loading: false,
  },
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default hotelSlice.reducer;
export const { setHotels, setLoading } = hotelSlice.actions;
