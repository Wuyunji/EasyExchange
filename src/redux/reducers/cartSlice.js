import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const updateReducer = (state, { payload }) => {
  payload = JSON.parse(payload);
  const count = payload.count;
  const index = state.findIndex((item) => item.proId === payload.proId);

  if (index !== -1) {
    if (count === 0) {
      state.splice(index, 1);
    } else {
      state[index].count = count;
    }
  } else {
    payload.count = count;
    state.push(payload);
  }
};

const toggleReducer = (state, { payload }) => {
  payload = JSON.parse(payload);
  state.forEach((item) => {
    if (item.proId === payload.proId) {
      item.checked = payload.checked;
    }
  });
};

const deleteReducer = (state, { payload }) => {
  payload = JSON.parse(payload);
  const index = state.findIndex((item) => item.proId === payload);
  state.splice(index, 1);
};

const clearCartReducer = (state, { payload }) => {
  return [];
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    update: updateReducer,
    toggle: toggleReducer,
    remove: deleteReducer,
    clearCart: clearCartReducer,
  },
});

export const { update, toggle, remove, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
