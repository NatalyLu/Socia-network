// import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
  profile: profileReducer,
  dialogs: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

// let store = configureStore(reducers);
let store = createStore(reducers);

export default store;