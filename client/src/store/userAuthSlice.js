import { createSlice } from "@reduxjs/toolkit";

const userAuth = createSlice({
  name: "userAuth",
  initialState: {
    modalState: false,
    authType: "Register",
  },
  reducers: {
    setModalState: (state, action) => {
      state.modalState = action.payload;
    },
    setAuthType: (state, action) => {
      state.authType = action.payload;
    },
  },
});

export const { setModalState, setAuthType } = userAuth.actions;
export default userAuth.reducer;
