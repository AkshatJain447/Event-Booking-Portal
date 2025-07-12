import { createSlice } from "@reduxjs/toolkit";

const userAuth = createSlice({
  name: "userAuth",
  initialState: {
    modalState: false,
    authType: "Register",
    user: {},
    isDashboard: "",
  },
  reducers: {
    setModalState: (state, action) => {
      state.modalState = action.payload;
    },
    setAuthType: (state, action) => {
      state.authType = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsDashboard: (state, action) => {
      state.isDashboard = action.payload;
    },
  },
});

export const { setModalState, setAuthType, setUser, setIsDashboard } =
  userAuth.actions;
export default userAuth.reducer;
