import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: [],
    loading: false,
    hotelCount: 0,
    searchQuery: {
      duration: 1,
      rooms: 1,
      halls: 1,
      peoples: 2,
    },
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
    setStoreSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default hotelSlice.reducer;
export const { setHotels, setLoading, setHotelCount, setStoreSearchQuery } =
  hotelSlice.actions;
