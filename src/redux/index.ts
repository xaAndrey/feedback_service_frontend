import { combineReducers } from "@reduxjs/toolkit";
import { registrationsReducer } from "../modules/registartions-page/redux";
import { store } from "../App";

export const rootReducer = combineReducers({
    registrations: registrationsReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;