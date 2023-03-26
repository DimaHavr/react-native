import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { authSlice } from "./auth/AuthReducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});
import thunk from "redux-thunk";

export const store = configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(thunk)
);
