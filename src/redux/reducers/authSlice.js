import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const setReducer = (state, { payload }) => {
  payload = JSON.parse(payload);
  state.isAuthenticated = payload;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    set: setReducer,
  },
});

export const { set } = authSlice.actions;

export default authSlice.reducer;
