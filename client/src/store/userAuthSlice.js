import { createSlice } from "@reduxjs/toolkit";

const userAuth = createSlice({
  name: "userAuth",
  initialState: {
    modalState: false,
    authType: "Register",
    user: {},
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
  },
});

export const { setModalState, setAuthType, setUser } = userAuth.actions;
export default userAuth.reducer;
