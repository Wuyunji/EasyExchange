import { combineReducers } from "redux";
import authSliceReducer from "./authSlice";
import cartSliceReducer from "./cartSlice";
import collectSliceReducer from "./collectSlice";

export default combineReducers({
  auth: authSliceReducer,
  cart: cartSliceReducer,
  collect: collectSliceReducer,
});
