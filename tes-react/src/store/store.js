import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./user";
import { counterReducer } from "./counter";
import { cartReducer } from "./cart";
import { thunk } from "redux-thunk";

export const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
  cart: cartReducer,
});

export const globalStore = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk)
);
