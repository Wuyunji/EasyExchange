import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const toggleReducer = (state, { payload }) => {
  payload = JSON.parse(payload);
  const set = new Set([...state]);
  if (!set.has(payload)) {
    set.add(payload);
  } else {
    set.delete(payload);
  }
  return [...set];
};

const clearCollectReducer = (state, { payload }) => {
  return [];
};

export const collectSlice = createSlice({
  name: "collect",
  initialState,
  reducers: {
    toggle: toggleReducer,
    clearCollect: clearCollectReducer,
  },
});

export const { toggle, clearCollect } = collectSlice.actions;

export default collectSlice.reducer;
